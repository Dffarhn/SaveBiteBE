import dotenv from "dotenv";
import Midtrans from "midtrans-client";
import { getOrderDetailsById, updateStatus } from "./order.js";
import { io, sendNotificationToUser } from "../../index.js"; // Import io from index.js
import { updatePoint } from "./user.js";
import { updateRestaurantTerjualByOrderId } from "./restaurant.js";

dotenv.config();

class MidtransService {
  constructor() {
    this.snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY_MIDTRANS,
      clientKey: process.env.CLIENT_KEY_MIDTRANS,
    });
  }

  async handlingPaymentMidtrans(notificationJson) {
    try {
      // Await Midtrans transaction notification
      // const statusResponse = await this.snap.transaction.notification(notificationJson);

      // Extract details from status response
      const orderId = notificationJson.order_id;
      const transactionStatus = notificationJson.transaction_status;
      const fraudStatus = notificationJson.fraud_status;
      const amount = notificationJson.gross_amount;

      // console.log(`Transaction notification received.
      //   Order ID: ${orderId},
      //   Transaction Status: ${transactionStatus},
      //   Fraud Status: ${fraudStatus}`);

      // Handle transaction status logic
      if (transactionStatus === "capture") {
        if (fraudStatus === "accept") {
          // TODO: Update database transaction status to 'success'
          return "Transaction captured and accepted.";
        }
      } else if (transactionStatus === "settlement") {
        // Check if all products are available

        await updateStatus(orderId, "OnGoing");

        await updateRestaurantTerjualByOrderId(orderId)

        const userId = await (await getOrderDetailsById(orderId)).userId;

        // Emit a notification to the user if user_id exists
        if (userId) {
          const message = `Your transaction (Order ID: ${orderId}) has been settled successfully.`;
          sendNotificationToUser(userId, "Pembayaran Selesai", message);
        }

        const points = Math.floor(parseInt(amount, 10) / 100);  // Convert the string to an integer and calculate points
        await updatePoint(userId, points);
        

        // Update order status if all products are available
        return "Transaction settled successfully.";
      } else if (transactionStatus === "cancel" || transactionStatus === "deny" || transactionStatus === "expire") {
        // TODO: Update database transaction status to 'failure'
        return "Transaction failed.";
      } else if (transactionStatus === "pending") {
        // TODO: Update database transaction status to 'pending'
        return "Transaction is pending.";
      }

      // Return the full status response for further use
      // return statusResponse;
    } catch (error) {
      console.error("Error handling Midtrans payment notification:", error.message);
      throw error;
    }
  }

  async createQrPaymentMidtrans(orderData) {
    try {
      const transaction = await this.snap.createTransaction(orderData);
      console.log("QR Payment Created Successfully:", transaction);

      // Access the transaction token or other details
      const transactionToken = transaction.token;
      console.log("Transaction Token:", transactionToken);

      return transaction;
    } catch (error) {
      console.error("Error creating QR payment:", error);
      throw error;
    }
  }
}

export default new MidtransService();
