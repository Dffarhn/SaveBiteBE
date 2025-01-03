import { config } from "dotenv";
import { convertImagesToWebp } from "./convertToWEBP.js";
import { bucket } from "../databases/firebaseDatabaseConfig.js";

config();

export async function uploadFilesPicture(files, saveAt) {
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("No files provided for upload");
  }

  try {
    const uploadPromises = files.map(async (file) => {
      const { buffer, originalname } = file;
      const firebaseFile = bucket.file(`recyleFood/${saveAt}/${Date.now()}_${originalname}`); // Unique filename with timestamp

      const stream = firebaseFile.createWriteStream({
        metadata: { contentType: file.mimetype },
      });

      // Handle the buffer stream and upload to Firebase
      stream.end(buffer);

      return new Promise((resolve, reject) => {
        stream.on("finish", async () => {
          const url = await firebaseFile.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // Customize expiration date as needed
          });
          resolve({
            key: firebaseFile.name,
            alt: `Image description ${originalname}`, // Customize alt text as needed
            url: url[0],
          });
        });

        stream.on("error", (error) => {
          console.error("Upload error:", error);
          reject(new Error("Firebase upload failed"));
        });
      });
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Firebase upload error:", error);
    throw new Error("Firebase upload failed");
  }
}

// Delete files from Firebase
export async function deleteFilesPicture(keys) {
  try {
    console.log(keys);
    const deletePromises = keys.map(async (key) => {
      const file = bucket.file(key);
      await file.delete();
    });
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Firebase delete error:", error);
    throw new Error("Firebase deletion failed");
  }
}

// Helper function to process and upload profile picture
export const processAndUploadProfilePicture = async (profilePictureFiles,folder) => {
  try {
    const processedFiles = profilePictureFiles.map((file) => ({
      originalname: `${file.originalname}_${Date.now()}`,
      size: file.size,
      mimetype: file.mimetype,
      buffer: file.buffer,
    }));

    // Convert images to WebP
    const convertedFiles = await convertImagesToWebp(processedFiles);
    console.log("Converted profile pictures to WebP:", convertedFiles);

    // Upload files to the storage
    const uploadedFiles = await uploadFilesPicture(convertedFiles, folder);
    console.log("Uploaded profile pictures:", uploadedFiles);
    return uploadedFiles;
  } catch (error) {
    console.error("Error processing and uploading profile picture:", error.message);
    throw new Error("Failed to process and upload profile picture");
  }
};
