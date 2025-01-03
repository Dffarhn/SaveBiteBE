import express from "express";
import userRouter from "./routes/user.js";
import restaurantRoute from "./routes/restaurant.js";
import mysteryboxRoute from "./routes/mysterybox.js";
import orderRoute from "./routes/order.js";


const router = express.Router();

router.use("/user",userRouter)
router.use("/restaurant",restaurantRoute)
router.use("/mysterybox",mysteryboxRoute)
router.use("/order", orderRoute)

export default router;
