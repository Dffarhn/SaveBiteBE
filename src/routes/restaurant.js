import express from "express";
import { createProductService, createRestaurantService, getAllProductsService, getAllRestaurantsService, getOneRestaurantsService, updateRestaurantService } from "../service/restaurant.js";
import upload from "../utils/multerConfig.js";

const restaurantRoute = express.Router();

// Route to get all restaurants
restaurantRoute.get("/", async (req, res) => {
  try {
    const restaurants = await getAllRestaurantsService();

    res.status(200).json({
      statusCode: 200,
      message: "Restaurants retrieved successfully",
      data: restaurants,
    });
  } catch (error) {
    console.error("Error retrieving restaurants:", error.message);
    res.status(500).json({
      statusCode: 500,
      message: "Failed to retrieve restaurants",
      error: error.message,
    });
  }
});

restaurantRoute.get("/:id", async (req, res) => {
  try {

    const restaurantId = req.params.id;
    const restaurants = await getOneRestaurantsService(restaurantId);

    res.status(200).json({
      statusCode: 200,
      message: "Restaurants retrieved successfully",
      data: restaurants,
    });
  } catch (error) {
    console.error("Error retrieving restaurants:", error.message);
    res.status(500).json({
      statusCode: 500,
      message: "Failed to retrieve restaurants",
      error: error.message,
    });
  }
});

// Route to get all products for a specific restaurant
restaurantRoute.get("/:id/products", async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const products = await getAllProductsService(restaurantId);

    res.status(200).json({
      statusCode: 200,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error.message);
    res.status(500).json({
      statusCode: 500,
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
});

// Route to create a restaurant
restaurantRoute.post("/", upload.fields([{ name: "picture_restaurant", maxCount: 1 }]), async (req, res) => {
  try {
    const restaurantData = req.body;
    const files = req.files;

    restaurantData.rating = 3.0

    const newRestaurant = await createRestaurantService(restaurantData, files);

    res.status(201).json({
      statusCode: 201,
      message: "Restaurant created successfully",
      data: newRestaurant,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error.message);
    res.status(500).json({
      statusCode: 500,
      message: "Failed to create restaurant",
      error: error.message,
    });
  }
});

// Route to add a product to a restaurant
restaurantRoute.post(
  "/:id/product",
  upload.fields([{ name: "picture_product", maxCount: 1 }]), // Handle the uploaded image
  async (req, res) => {
    try {
      const productId = req.params.id;
      let { name, description, restaurantId, price, expiredTime } = req.body;

      // Convert price and expired_time to numbers (int or float)
      price = parseInt(price); // Converts to float for price
      expiredTime = parseInt(expiredTime); // Converts to integer for expiredTime

      console.log(price, expiredTime)

      // Ensure the conversions were successful
      if (isNaN(price) || isNaN(expiredTime)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid price or expired time. Please provide valid numbers.",
        });
      }

      // Handle the file (picture_product)
      const files = req.files;
      console.log(files);

      // Call the service to create the product
      const newProduct = await createProductService(
        productId,
        {
          name,
          description,
          restaurantId,
          price,
          expiredTime,
        },
        files
      );

      // Respond with success
      res.status(201).json({
        statusCode: 201,
        message: "Product added successfully",
        data: newProduct,
      });
    } catch (error) {
      console.error("Error adding product:", error.message);
      res.status(500).json({
        statusCode: 500,
        message: "Failed to add product",
        error: error.message,
      });
    }
  }
);

// Route to update a restaurant
restaurantRoute.put(
  "/:id",
  upload.fields([{ name: "picture_restaurant", maxCount: 1 }]), // Handle uploaded images
  async (req, res) => {
    try {

      console.log("masuk edit")
      const restaurantId = req.params.id;
      const updateData = req.body;
      const files = req.files;


      console.log(restaurantId,updateData,files)
      // Call the update service
      const updatedRestaurant = await updateRestaurantService(restaurantId, updateData, files);

      res.status(200).json({
        statusCode: 200,
        message: "Restaurant updated successfully",
        data: updatedRestaurant,
      });
    } catch (error) {
      console.error("Error updating restaurant:", error.message);
      res.status(500).json({
        statusCode: 500,
        message: "Failed to update restaurant",
        error: error.message,
      });
    }
  }
);


export default restaurantRoute;
