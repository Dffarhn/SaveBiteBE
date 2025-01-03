import { config } from "dotenv";
import admin from "firebase-admin";
import { readFile } from "fs/promises";

config();

let firestore;
let bucket;

(async () => {
  try {
    // Load service account JSON files dynamically
    const firestoreServiceAccount = JSON.parse(
      await readFile(new URL("../databases/database.json", import.meta.url))
    );

    const storageServiceAccount = JSON.parse(
      await readFile(new URL("../databases/storage.json", import.meta.url))
    );

    // Initialize Firestore and Storage
    const firestoreApp =
      admin.apps.find(app => app.name === "FirestoreApp") ||
      admin.initializeApp(
        { credential: admin.credential.cert(firestoreServiceAccount) },
        "FirestoreApp"
      );

    const storageApp =
      admin.apps.find(app => app.name === "StorageApp") ||
      admin.initializeApp(
        {
          credential: admin.credential.cert(storageServiceAccount),
          storageBucket: "gs://bekaspakaistorage.appspot.com",
        },
        "StorageApp"
      );

    firestore = firestoreApp.firestore();
    bucket = storageApp.storage().bucket();
  } catch (error) {
    console.error("Error initializing Firebase services:", error.message);
  }
})();

export { firestore, bucket };
