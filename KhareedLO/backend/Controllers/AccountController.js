
const useraccounts_tb = require('../Models/UserAccount'); // Adjust the path as needed

// Create a new user account
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newUser = new useraccounts_tb({ name, email, password, role });
    const savedUser = await newUser.save();

    return res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating user", error: error.message });
  }
};

// Get all user accounts
const getAllUsers = async (req, res) => {
  try {
    const users = await useraccounts_tb.find().populate("role","RoleName")  //.populate() Mongoose ka ek method hai jo database ke referenced documents ko automatically join kar ke detail laata hai. Agar kisi collection mein ek field doosre collection ka reference ho, to .populate() us reference ki puri detail fetch karne ke liye use hota hai.
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching users", error: error.message });
  }
};

// Get a single user account by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await useraccounts_tb.findById(id).populate("role", "RoleName Status");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching user", error: error.message });
  }
};

// Update a user account by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await useraccounts_tb.findByIdAndUpdate(id, updates, { new: true }).populate("role", "RoleName Status");
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating user", error: error.message });
  }
};

// Delete a user account by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await useraccounts_tb.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
