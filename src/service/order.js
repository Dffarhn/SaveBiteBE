import { firestore } from "../databases/firebaseDatabaseConfig.js";
import { getMysteryBoxesDetails } from "./mysterybox.js";
import { getUserDetailService } from "./user.js";
import MidtransService from "./midtrans.js";
import { Timestamp } from "firebase-admin/firestore";
import { deleteFilesPicture, processAndUploadProfilePicture } from "../utils/uploadImage.js";
import { sendNotificationToUser } from "../../index.js";
import { getVoucherUser } from "./voucher.js";

export const createOrder = async (userId, mysteryBoxs, category, addressReceiver, phoneNumberReceiver, voucherId) => {
  try {
    // Check if the user exists
    const userDetails = await getUserDetailService(userId);

    if (!userDetails) {
      throw new Error(`User with ID ${userId} does not exist`);
    }

    if (!Array.isArray(mysteryBoxs) || mysteryBoxs.length === 0) {
      throw new Error("mysteryBoxs must be a non-empty array.");
    }

    // Fetch details for all mystery boxes in one query
    const mysteryBoxDetails = await getMysteryBoxesDetails(mysteryBoxs);

    // Calculate the total amount before discount (including admin fee)
    const adminFee = 4999;
    const totalPriceBeforeDiscount =
      mysteryBoxDetails.reduce((sum, mysteryBoxDetail) => {
        if (!mysteryBoxDetail.price) {
          throw new Error(`Price not found for mystery box ID ${mysteryBoxDetail.id}`);
        }
        return sum + mysteryBoxDetail.price;
      }, 0) + adminFee;

    // Calculate the discount
    let actualDiscount = 0;
    if (voucherId) {
      const voucher = await getVoucherUser(userId, voucherId); // Get the voucher details
      const voucherDiscountPercentage = voucher.detailData.discount || 0; // Discount percentage (0 to 100)
      const maxDiscount = voucher.detailData.maximumDiscount || 0.0; // Maximum discount (in currency)


      // Calculate discount amount based on percentage
      const discountAmount = totalPriceBeforeDiscount * (voucherDiscountPercentage / 100.0);

      // Ensure the discount does not exceed the maximum allowed discount
      actualDiscount = Math.min(parseInt(discountAmount), parseInt(maxDiscount));
    }


    // Total price after applying discount
    const totalAmount = totalPriceBeforeDiscount - actualDiscount;

    // Create the order object
    const order = {
      userId,
      mysteryBoxs,
      totalAmount,
      category,
      status: "Pending",
      createdAt: Timestamp.now(),
    };

    // Add address and phone number only for donation category
    if (category === "Donation") {
      if (!addressReceiver || !phoneNumberReceiver) {
        throw new Error("Address and phone number are required for donation category.");
      }
      order.addressReceiver = addressReceiver;
      order.phoneNumberReceiver = phoneNumberReceiver;
    }

    // Save the order to Firestore
    const orderRef = await firestore.collection("orders").add(order);

    console.log("Order created with ID:", orderRef.id);

    const orderData = {
      transaction_details: {
        order_id: orderRef.id,
        gross_amount: totalAmount,
      },
    };

    const createPayment = await MidtransService.createQrPaymentMidtrans(orderData);

    if (!createPayment || !createPayment.token) {
      throw new Error("Failed to retrieve payment token from Midtrans.");
    }

    // Update the order document with the token_midtrans
    await orderRef.update({ tokenMidtrans: createPayment.token });

    return { id: orderRef.id, token_midtrans: createPayment };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const updateStatus = async (orderId, status) => {
  await firestore
    .collection("orders")
    .doc(orderId)
    .update({ status })
    .catch((err) => {
      console.error("Error updating order status:", err);
      throw new Error("Failed to update order status.");
    });
};

export const getOrderDetailsById = async (orderId) => {
  try {
    // Fetch the order from Firestore
    const orderRef = firestore.collection("orders").doc(orderId);
    const orderSnapshot = await orderRef.get();

    if (!orderSnapshot.exists) {
      throw new Error(`Order with ID ${orderId} does not exist`);
    }

    const orderData = orderSnapshot.data();
    console.log(orderData);

    // Include additional fields if the category is 'Donation'
    const additionalFields =
      orderData.category === "Donation"
        ? {
            phoneNumberReceiver: orderData.phoneNumberReceiver || null,
            addressReceiver: orderData.addressReceiver || null,
          }
        : {};

    return {
      orderId: orderSnapshot.id,
      userId: orderData.userId,
      totalAmount: orderData.totalAmount,
      category: orderData.category,
      status: orderData.status,
      createdAt: orderData.createdAt.toDate(),
      tokenMidtrans: orderData.tokenMidtrans || null,
      ...additionalFields,
    };
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const uploadProof = async (orderId, file) => {
  const uploadedFiles = []; // Track uploaded files for potential rollback

  try {
    // Reference to the order document
    const orderRef = firestore.collection("orders").doc(orderId);

    console.log(file);

    // Check if the order document exists
    const orderSnapshot = await orderRef.get();
    if (!orderSnapshot.exists) {
      throw new Error(`Order with ID ${orderId} does not exist`);
    }

    const orderData = orderSnapshot.data();

    const updateData = { ...orderData };

    // Process proof file if provided
    if (file?.proofFile?.length > 0) {
      // Convert and upload new profile picture
      const profilePictureUpload = await processAndUploadProfilePicture(file.proofFile, "proveDelivery");
      updateData.proveDeliveryDonasi = profilePictureUpload[0]; // Assign uploaded file data
      uploadedFiles.push(profilePictureUpload[0].key); // Track new file key for rollback
    }

    // Update the order document with the new proof URL
    await orderRef.update(updateData);

    if (orderData.userId) {
      const message = `Donasi Anda Telah Selesai Di Antarkan`;
      sendNotificationToUser(orderData.userId, "Donasi Selesai", message);
    }

    updateStatus(orderId, "Done");

    // Retrieve and return the updated order data
    const updatedOrderSnapshot = await orderRef.get();
    console.log(`Order with ID ${orderId} updated successfully`);
    return updatedOrderSnapshot.data();
  } catch (error) {
    // Rollback any uploaded files in case of an error
    if (uploadedFiles.length > 0) {
      console.log("Rolling back uploaded files...");
      await deleteFilesPicture(uploadedFiles);
    }
    console.error("Error updating user:", error.message);
    throw new Error("Failed to update user");
  }
};

export const getAllOrder = async (restaurantId) => {
  try {
    const ordersRef = firestore.collection("orders").where("status", "==", "OnGoing");
    const orderSnapshot = await ordersRef.get();

    if (orderSnapshot.empty) {
      return []; // No orders found
    }

    const orders = [];

    console.log("masuk");

    for (const doc of orderSnapshot.docs) {
      const orderData = doc.data();

      const userInformation = await getUserDetailService(orderData.userId);
      console.log("masuk");

      // Ensure mysteryBox array exists and has at least one element
      if (!orderData.mysteryBoxs || orderData.mysteryBoxs.length === 0) {
        continue;
      }

      const mysteryBoxId = orderData.mysteryBoxs[0]; // Use the first element
      console.log(mysteryBoxId);
      const mysteryBoxDoc = await firestore.collection("mysterybox").doc(mysteryBoxId).get();

      if (!mysteryBoxDoc.exists) {
        continue; // Skip if mysteryBox document doesn't exist
      }

      const mysteryBoxData = mysteryBoxDoc.data();

      console.log(mysteryBoxData);

      // Check if the restaurantId matches
      if (mysteryBoxData.restaurant !== `/restaurants/${restaurantId}`) {
        continue;
      }

      // Include additional fields if the category is 'Donation'
      const additionalFields =
        orderData.category === "Donation"
          ? {
              phoneNumberReceiver: orderData.phoneNumberReceiver || null,
              addressReceiver: orderData.addressReceiver || null,
            }
          : {};

      // Add the order to the result
      orders.push({
        orderId: doc.id,
        userId: orderData.userId,
        totalAmount: orderData.totalAmount,
        category: orderData.category,
        status: orderData.status,
        createdAt: orderData.createdAt.toDate(),
        tokenMidtrans: orderData.tokenMidtrans || null,
        ...additionalFields,
        user: { ...userInformation },
      });
    }

    return orders;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};
