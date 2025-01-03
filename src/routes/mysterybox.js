import express from "express";
import { createMysteryBox } from "../service/mysterybox.js";

const mysteryboxRoute = express.Router();

mysteryboxRoute.post("/:restaurant_id", async (req, res) => {
  const { restaurant_id } = req.params;
  const { name, price, products } = req.body;

  // Validate required fields
  if (!name || !price || !products) {
    return res.status(400).json({ message: "All fields are required: name, price, products" });
  }

  try {
    const result = await createMysteryBox(restaurant_id, { name, price, products });
    res.status(201).json({
      statusCode:201,
      message: "Mysterybox added successfully!",
      id: result.id,
    });
  } catch (error) {
    console.error("Error adding mysterybox:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default mysteryboxRoute;
