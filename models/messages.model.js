import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      minLength: [3, "message can't be less than 3 characters"],
      maxLength: [2000, "message body can't be more than 2000 characters"],
    },
    user: String,
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
  }
);

export const Message = model("Message", messageSchema);
