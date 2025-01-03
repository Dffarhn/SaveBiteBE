import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../databases/firebaseDatabaseConfig.js";

export const createMysteryBox = async (restaurantId, mysteryboxData) => {
  const mysteryboxCollection = firestore.collection("mysterybox");

  // Transform products to include the full path
  const transformedProducts = mysteryboxData.products.map(
    (productId) => `/restaurants/${restaurantId}/products/${productId}`
  );

  // Append restaurant reference and transformed products to the mysterybox data
  const newMysteryBox = {
    ...mysteryboxData,
    restaurant: `/restaurants/${restaurantId}`,
    products: transformedProducts, // Add transformed product paths
    createdAt: Timestamp.now()
  };

  // Add the document to the Firestore collection
  const mysteryboxRef = await mysteryboxCollection.add(newMysteryBox);
  return { id: mysteryboxRef.id };
};

export const getMysteryBoxesDetails = async (mysteryBoxIds) => {
  try {
    if (!Array.isArray(mysteryBoxIds) || mysteryBoxIds.length === 0) {
      throw new Error("mysteryBoxIds must be a non-empty array.");
    }

    const mysteryboxCollection = firestore.collection("mysterybox");

    // Fetch documents by their document IDs
    const mysteryBoxPromises = mysteryBoxIds.map((id) =>
      mysteryboxCollection.doc(id).get()
    );

    // Resolve all promises
    const mysteryBoxSnapshots = await Promise.all(mysteryBoxPromises);

    // Check if all documents exist and transform data
    const mysteryBoxDetails = mysteryBoxSnapshots.map((snapshot) => {
      if (!snapshot.exists) {
        throw new Error(`Mystery box with ID ${snapshot.id} not found.`);
      }
      return { id: snapshot.id, ...snapshot.data() };
    });

    return mysteryBoxDetails;
  } catch (error) {
    console.error("Error fetching mystery box details:", error);
    throw error;
  }
};

