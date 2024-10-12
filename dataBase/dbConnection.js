import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect(`mongodb://127.0.0.1:27017/sarahah_App`, {
    serverSelectionTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });
