import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    password: String,
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    otp: String,
    otpExpire: Date,
    changePass: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("User", userSchema);
