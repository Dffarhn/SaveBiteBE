import { firestore } from "../databases/firebaseDatabaseConfig.js";

// Get Voucher Details for a User
export const getVoucherUser = async (userId, voucherId) => {
  try {
    // Fetch the voucher from the user's voucher collection
    const voucherRef = firestore.collection("users").doc(userId).collection("voucher").where("voucherId", "==", voucherId);
    const voucherSnapshot = await voucherRef.get();

    if (voucherSnapshot.empty) {
      throw new Error(`Voucher with ID ${voucherId} does not exist for user ${userId}`);
    }

    // Assuming there is only one voucher matching the voucherId
    const voucherData = voucherSnapshot.docs[0].data(); // Access the first document in the snapshot

    // Await the result of getVoucherDetails, as it is an async function
    const detailData = await getVoucherDetails(voucherData.voucherId);

    return {
      id: voucherSnapshot.docs[0].id,
      isAvailable: voucherData.isAvailable,
      detailData,
    };
  } catch (error) {
    console.error("Error fetching voucher for user:", error);
    throw error; // Re-throw the error for proper handling in the calling function
  }
};

// Get Voucher Details from Vouchers Collection
export const getVoucherDetails = async (voucherId) => {
  try {
    // Fetch the voucher details from the vouchers collection
    const voucherRef = firestore.collection("vouchers").doc(voucherId);
    const voucherSnapshot = await voucherRef.get();

    if (!voucherSnapshot.exists) {
      throw new Error(`Voucher with ID ${voucherId} does not exist`);
    }

    const voucherData = voucherSnapshot.data();

    return {
      id: voucherSnapshot.id,
      discount: voucherData.discount,
      maximumDiscount: voucherData.maximumDiscount,
      minimumPayment: voucherData.minimumPayment,
      name: voucherData.name,
    };
  } catch (error) {
    console.error("Error fetching voucher details:", error);
    throw error; // Re-throw the error for proper handling in the calling function
  }
};
