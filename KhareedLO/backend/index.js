const express = require("express");
const app = express();
const cors =require("cors")

//----------env connect
require("dotenv").config();

// --- MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//-----db connect
const {connectionDB} = require("./Config/Database")

//--- CONTROLLER IMPORT-----ROLES TABLE------


const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
} = require("./Controllers/RolesController");


// Create role
app.route("/roles").post(createRole);

// Get all roles
app.route("/roles").get(getAllRoles);

// Get single role by ID
app.route("/roles/:id").get(getRoleById);

// Update role by ID
app.route("/roles/:id").put(updateRole);

// Delete role by ID
app.route("/roles/:id").delete(deleteRole);



//--- CONTROLLER IMPORT-----UserAccount TABLE------
const userController = require('./Controllers/AccountController'); // Adjust path as needed



// POST USERS
app.route('/users').post(userController.createUser);

// GET USER
app.route('/users').get(userController.getAllUsers);

// GET SINGLE USER
app.route('/users/:id').get(userController.getUserById);

// SINGLE USER UPDATE
app.route('/users/:id').put(userController.updateUser);

// DELETE SINGLE USER
app.route('/users/:id').delete(userController.deleteUser);






//--------server listen

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`)
  connectionDB() // invoking DB
})
