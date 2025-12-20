import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    googleId: {
      type: String,
      default: null
    },

    authProvider: {
      type: String,
      enum: ["google", "local"],
      required: true
    },

    profileImage: {
      type: String,
      default: null
    },

    isVerified: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
