import { firestore } from "../databases/firebaseDatabaseConfig.js";
import { deleteFilesPicture, processAndUploadProfilePicture, uploadFilesPicture } from "../utils/uploadImage.js";

export const updateUserService = async (id_user, userData, files) => {
  const uploadedFiles = [];

  try {
    // Reference to the user document
    const userRef = firestore.collection("users").doc(id_user);

    // Check if the user document exists
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
      throw new Error(`User with ID ${id_user} not found`);
    }

    const updateData = { ...userData };

    // Process profile picture if provided
    if (files?.profile_picture?.length > 0) {
      const currentProfilePicture = userSnapshot.data()?.profile_picture;

      // Delete existing profile picture if present
      if (currentProfilePicture) {
        await deleteFilesPicture([currentProfilePicture.key]);
        console.log(`Deleted existing profile picture: ${currentProfilePicture.key}`);
      }

      // Convert and upload new profile picture
      const profilePictureUpload = await processAndUploadProfilePicture(files.profile_picture, "userProfile");
      updateData.profilePicture = profilePictureUpload[0]; // Assign uploaded file data
      uploadedFiles.push(profilePictureUpload[0].key); // Track new file key for rollback
    }

    // Update the user document with the new data
    await userRef.update(updateData);

    // Retrieve and return the updated user data
    const updatedUserSnapshot = await userRef.get();
    console.log(`User with ID ${id_user} updated successfully`);
    return updatedUserSnapshot.data();
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

export const getUserDetailService = async (id_user) => {
  try {
    // Reference to the user document
    const userRef = firestore.collection("users").doc(id_user);

    // Fetch the user document
    const userSnapshot = await userRef.get();

    // Check if the user document exists
    if (!userSnapshot.exists) {
      throw new Error(`User with ID ${id_user} not found`);
    }

    // Return the user data
    console.log(`Retrieved details for user ID: ${id_user}`);
    return userSnapshot.data();
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    throw new Error("Failed to retrieve user details");
  }
};

export const updatePoint = async (id_user, point) => {
  try {
    // Validate input
    if (!id_user || typeof id_user !== 'string') {
      throw new Error('Invalid user ID');
    }
    if (typeof point !== 'number' || point < 0) {
      throw new Error('Invalid point value. It must be a non-negative number.');
    }

    const userRef = firestore.collection("users").doc(id_user);

    // Start a transaction to ensure data consistency
    await firestore.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        throw new Error(`User with ID ${id_user} not found`);
      }

      // Get the current points from the document
      const currentPoints = userDoc.data().points || 0;

      // Calculate the updated points
      const updatedPoints = currentPoints + point;

      // Update the points in the document
      transaction.update(userRef, { points: updatedPoints });
    });

    console.log(`Successfully updated points for user ${id_user}`);
    return { success: true, message: `User's points updated successfully` };
  } catch (error) {
    console.error('Error updating points:', error.message);
    throw new Error(`Failed to update points for user ${id_user}: ${error.message}`);
  }
};
