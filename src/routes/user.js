import express from "express";
import { updateUserService } from "../service/user.js";
import upload from "../utils/multerConfig.js";

const userRouter = express.Router();

userRouter.patch("/:id_user", upload.fields([{ name: "profile_picture", maxCount: 1 }]), async (req, res) => {
  const { id_user } = req.params; // User ID from URL
  const userData = req.body; // Data to update

  try {
    // Call the Firestore update service
    const updatedUser = await updateUserService(id_user, userData,req.files);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      statusCode: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the user",
    });
  }
});

export default userRouter;
