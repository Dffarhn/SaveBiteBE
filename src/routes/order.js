import express from "express";
import { createOrder, getAllOrder, getOrderDetailsById, updateStatus, uploadProof } from "../service/order.js";
import midtrans from "../service/midtrans.js";
import { sendNotificationToUser } from "../../index.js";
import upload from "../utils/multerConfig.js";
import { firestore } from "../databases/firebaseDatabaseConfig.js";

const orderRoute = express.Router();

// Make sure body-parser or express.json() middleware is applied
orderRoute.use(express.json());

orderRoute.post("/:userId/pay", async (req, res) => {
  try {
    const { userId } = req.params;
    const { mysteryBox, category, addressReceiver, phoneNumberReceiver, voucherId } = req.body;

    // Validate input
    if (!Array.isArray(mysteryBox) || mysteryBox.length === 0) {
      return res.status(400).json({ error: "mysteryBox must be a non-empty array" });
    }
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    // Validate address and phone number only for "donation" category
    if (category === "Donation") {
      if (!addressReceiver || !phoneNumberReceiver) {
        return res.status(400).json({
          error: "Address and phone number are required for donation category",
        });
      }
    }

    // Process the mysteryBox array and other fields
    console.log(`User ID: ${userId}`);
    console.log(`Mystery Box IDs: ${mysteryBox}`);
    console.log(`Category: ${category}`);
    if (addressReceiver) {
      console.log(`Address Receiver: ${addressReceiver}`);
    }
    if (phoneNumberReceiver) {
      console.log(`Phone Number Receiver: ${phoneNumberReceiver}`);
    }

    // Call createOrder with all necessary data
    const payload = await createOrder(userId, mysteryBox, category, addressReceiver, phoneNumberReceiver, voucherId);

    res.status(201).json({
      statusCode: 201,
      message: "Order processed successfully",
      data: payload,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

orderRoute.post("/notification", async (req, res) => {
  try {
    const data = req.body;

    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Invalid notification data" });
    }

    const response = await midtrans.handlingPaymentMidtrans(data);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error handling payment notification:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

orderRoute.post("/take/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    // Check if orderId is valid (you can add further validation based on your requirements)
    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const response = await updateStatus(orderId, "Done");

    const userId = (await getOrderDetailsById(orderId)).userId;

    console.log(userId);

    // Emit a notification to the user if user_id exists
    if (userId) {
      const message = `Your transaction (Order ID: ${orderId}) has been settled successfully.`;
      sendNotificationToUser(userId, "Scanned", message);
    }

    res.status(200).json({message:"Berhasil"});
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Add a new route to get order details by ID
orderRoute.get("/details/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    // Validate the orderId parameter
    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    // Fetch order details using the service function
    const orderDetails = await getOrderDetailsById(orderId);

    // Respond with the order details
    res.status(200).json({
      statusCode: 200,
      message: "Order details fetched successfully",
      data: orderDetails,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

orderRoute.get("/", async (req, res) => {
  const { restaurantId } = req.query;

  if (!restaurantId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Restaurant ID is required",
    });
  }

  try {
    const orderDetails = await getAllOrder(restaurantId);

    res.status(200).json({
      statusCode: 200,
      message: "Order details fetched successfully",
      data: orderDetails,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      details: error.message,
    });
  }
});


// POST route to upload proof
orderRoute.post("/:orderId/upload-proof", upload.fields([{ name: "proofFile", maxCount: 1 }]), async (req, res) => {
  try {
    const { orderId } = req.params;
    const file = req.files;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadProof(orderId, file);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in uploading proof:", error);
    res.status(500).json({ message: error.message });
  }
});

export default orderRoute;
