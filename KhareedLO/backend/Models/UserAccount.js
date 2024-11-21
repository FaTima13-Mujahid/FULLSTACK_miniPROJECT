const mongoose = require("mongoose");


const UserAccount_Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensure email is unique
      lowercase: true, // Store email in lowercase
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Basic email validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: mongoose.Schema.ObjectId,
      ref: "Roles", // Reference to the 'Roles' collection
      required: [true, "Role is required"], // Ensure role is provided
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);


const useraccounts_tb = mongoose.model("useraccounts_tb", UserAccount_Schema);

module.exports = useraccounts_tb;