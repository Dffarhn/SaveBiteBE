import { GeoPoint } from "firebase-admin/firestore";
import { firestore } from "../databases/firebaseDatabaseConfig.js";
import { uploadFilesPicture, deleteFilesPicture, processAndUploadProfilePicture } from "../utils/uploadImage.js";


export const createRestaurantService = async (restaurantData, files) => {
  const uploadedFiles = [];

  try {
    // Reference to the restaurants collection
    const restaurantRef = firestore.collection("restaurants");

    const createData = { ...restaurantData };

    // Parse and handle location using GeoPoint
    if (createData.latitude && createData.longitude) {
      createData.location = new GeoPoint(
        parseFloat(createData.latitude), 
        parseFloat(createData.longitude)
      );
      delete createData.latitude; // Remove redundant fields
      delete createData.longitude;
    } else if (createData.location) {
      // If location is provided in formatted string
      const locationParts = createData.location.match(/([\d.-]+)[°]\s?[NS],\s?([\d.-]+)[°]\s?[EW]/);
      if (locationParts) {
        createData.location = new GeoPoint(
          parseFloat(locationParts[1]),
          parseFloat(locationParts[2])
        );
      }
    }

    // Process picture if provided
    if (files?.picture_restaurant?.length > 0) {
      const profilePictureUpload = await processAndUploadProfilePicture(
        files.picture_restaurant,
        "restaurant"
      );
      createData.profilePicture = profilePictureUpload[0]; // Assign uploaded file data
      uploadedFiles.push(profilePictureUpload[0].key); // Track uploaded file key for rollback
    }

    // Add the restaurant document to Firestore
    const newRestaurantRef = await restaurantRef.add(createData);

    // Retrieve and return the newly created restaurant data
    const newRestaurantSnapshot = await newRestaurantRef.get();
    console.log(`Restaurant created successfully with ID: ${newRestaurantRef.id}`);
    return { id: newRestaurantRef.id, ...newRestaurantSnapshot.data() };

  } catch (error) {
    // Rollback any uploaded files in case of an error
    if (uploadedFiles.length > 0) {
      console.log("Rolling back uploaded files...");
      await deleteFilesPicture(uploadedFiles);
    }
    console.error("Error creating restaurant:", error.message);
    throw new Error("Failed to create restaurant");
  }
};


// Service to update restaurant details
export const updateRestaurantService = async (id_restaurant, restaurantData, files) => {
  const uploadedFiles = [];

  try {
    // Reference to the restaurant document
    const restaurantRef = firestore.collection("restaurants").doc(id_restaurant);

    // Check if the restaurant document exists
    const restaurantSnapshot = await restaurantRef.get();

    console.log(restaurantSnapshot)
    if (!restaurantSnapshot.exists) {
      throw new Error(`Restaurant with ID ${id_restaurant} not found`);
    }

    const updateData = { ...restaurantData };

    // Process profile picture if provided
    if (files?.picture_restaurant?.length > 0) {
      const currentProfilePicture = restaurantSnapshot.data()?.profilePicture;

      // Delete existing profile picture if present
      if (currentProfilePicture) {
        await deleteFilesPicture([currentProfilePicture.key]);
        console.log(`Deleted existing profile picture: ${currentProfilePicture.key}`);
      }

      // Convert and upload new profile picture
      const profilePictureUpload = await processAndUploadProfilePicture(
        files.picture_restaurant,
        "restaurant"
      );
      updateData.profilePicture = profilePictureUpload[0]; // Assign uploaded file data
      uploadedFiles.push(profilePictureUpload[0].key); // Track new file key for rollback
    }

    // Update the restaurant document with the new data
    await restaurantRef.update(updateData);

    // Retrieve and return the updated restaurant data
    const updatedRestaurantSnapshot = await restaurantRef.get();
    console.log(`Restaurant with ID ${id_restaurant} updated successfully`);
    return updatedRestaurantSnapshot.data();
  } catch (error) {
    // Rollback any uploaded files in case of an error
    if (uploadedFiles.length > 0) {
      console.log("Rolling back uploaded files...");
      await deleteFilesPicture(uploadedFiles);
    }
    console.error("Error updating restaurant:", error.message);
    throw new Error("Failed to update restaurant");
  }
};



export const createProductService = async (restaurantId, productData, files) => {
  const uploadedFiles = [];

  try {
    // Reference to the products collection under a specific restaurant
    const productRef = firestore
      .collection("restaurants")
      .doc(restaurantId)
      .collection("products");

    const createData = { ...productData };

    console.log(files)
    console.log(files.picture_product[0])
    // Process product picture if provided
    if (files?.picture_product?.length > 0) {
      console.log("masuk")
      // Convert and upload product picture
      const productPictureUpload = await processAndUploadProfilePicture(
        files.picture_product,
        "product"
      );
      createData.productPicture = productPictureUpload[0]; // Assign uploaded file data
      uploadedFiles.push(productPictureUpload[0].key); // Track uploaded file key for rollback
    }

    // Add the product document to Firestore
    const newProductRef = await productRef.add(createData);

    // Retrieve and return the newly created product data
    const newProductSnapshot = await newProductRef.get();
    console.log(`Product created successfully with ID: ${newProductRef.id}`);
    return { id: newProductRef.id, ...newProductSnapshot.data() };
  } catch (error) {
    // Rollback any uploaded files in case of an error
    if (uploadedFiles.length > 0) {
      console.log("Rolling back uploaded files...");
      await deleteFilesPicture(uploadedFiles);
    }
    console.error("Error creating product:", error.message);
    throw new Error("Failed to create product");
  }
};

// Service to fetch all restaurants
export const getAllRestaurantsService = async () => {
  const restaurantRef = firestore.collection("restaurants");
  const snapshot = await restaurantRef.get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


export const getOneRestaurantsService = async (id_restaurant) => {
  const restaurantRef = firestore.collection("restaurants").doc(id_restaurant);
  const snapshot = await restaurantRef.get();

  if (!snapshot.exists) {
    return null; // Return null if the document doesn't exist
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};


// Service to fetch all products for a specific restaurant
export const getAllProductsService = async (restaurantId) => {
  const productsRef = firestore
    .collection("restaurants")
    .doc(restaurantId)
    .collection("products");

  const snapshot = await productsRef.get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


export const updateRestaurantTerjualByOrderId = async (orderId) => {
  try {
    // Step 1: Fetch the order document by orderId
    const orderDoc = await firestore.collection("orders").doc(orderId).get();
    if (!orderDoc.exists) {
      throw new Error("Order not found");
    }
    const orderData = orderDoc.data();

    // Ensure mysteryBox array exists and has at least one element
    if (!orderData.mysteryBoxs || orderData.mysteryBoxs.length === 0) {
      throw new Error("MysteryBox not found in the order");
    }

    // Step 2: Retrieve the mysteryBox document
    const mysteryBoxId = orderData.mysteryBoxs[0];
    const mysteryBoxDoc = await firestore.collection("mysterybox").doc(mysteryBoxId).get();
    if (!mysteryBoxDoc.exists) {
      throw new Error("MysteryBox document not found");
    }
    const mysteryBoxData = mysteryBoxDoc.data();

    // Step 3: Extract restaurantId and update its terjual field
    const restaurantPath = mysteryBoxData.restaurant; // Example: /restaurants/{restaurantId}
    const restaurantId = restaurantPath.split("/")[2]; // Extract restaurantId

    const restaurantRef = firestore.collection("restaurants").doc(restaurantId);
    const restaurantDoc = await restaurantRef.get();
    if (!restaurantDoc.exists) {
      throw new Error("Restaurant document not found");
    }
    const restaurantData = restaurantDoc.data();

    // Step 5: Increment the terjual field
    const currentTerjual = restaurantData.selling || 0; // Default to 0 if terjual is not set
    const updatedTerjual = currentTerjual + 1;

    // Step 6: Update the terjual field in the restaurant document
    await restaurantRef.update({
      selling: updatedTerjual,
    });

    console.log(`Successfully updated terjual for restaurant ${restaurantId}`);
    return true;
  } catch (error) {
    console.error("Error updating restaurant terjual:", error);
    throw error;
  }
};


