// const express = require("express");
// const app = express();
// const cors =require("cors")

// //----------env connect
// require("dotenv").config();

// // --- MIDDLEWARE
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
// app.use(cors())

// //-----db connect
// const {connectionDB} = require("./Config/Database")

// //--- MODELS IMPORT
// const {
//   createRoles,
//   getRoles,
//   deleteRoles,
//   updateRole,
// } = require("./Controllers/RolesController");

// //--- ROLES API ROUTE      GET      CREATE
// app.route("/roles").get(getRoles).post(createRoles)

// //--- ROLES API ROUTE      DELETE               EDIT
// app.route("/roles/:id").delete(deleteRoles).put(updateRole);

// //--------server listen

// app.listen(process.env.PORT, function () {
//   console.log(`Server is running on port ${process.env.PORT}`)
//   connectionDB() // invoking DB
// })
