import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect(`mongodb+srv://${process.env.cloud_DB_user}:${process.env.cloud_DB_pass}@e-commerce.j07rt.mongodb.net/sara7a_APP`, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("database connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });
