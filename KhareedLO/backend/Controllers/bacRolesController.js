//-------ROLES TABLE CONTROLLER (CRUD)

// --MODEL
const { roles } = require("../Models/Roles");
// const { registration } = require("../Models/UserAccount");

// Method -------  POST
// Api   --------  http://localhost:5000/roles
// Description --  CREATE ROLES FUNCTION

async function createRoles(req, res) {
  const { role_name, status } = req.body;

  //--- role_name exist find()
  const role_nameExist = await roles.find({
    role_name: role_name.toLowerCase(),
  });

  //--- role validate using regex
 const role_nameChecker = /^[A-Za-z\s]{4,}$/;

  if (role_nameChecker.test(role_name)) {
    if (role_nameExist.length > 0)
      return res.status(500).send({ error: "Already added this role" });

    const newRole = await roles.create({
      role_name: role_name.toLowerCase(),
      status: status,
    });

    return res.status(201).send({ data: req.body });
  } else {
    return res.status(500).send({
      error: "Special character, numbers and extra spaces are not allowed!!",
    });
  }
}

// Method -------  GET
// Api   --------  http://localhost:5000/roles
// Description -- GET ROLES FUNCTION

async function getRoles(req, res) {
  const all_roles = await roles.find();

  return res.status(200).send({ data: all_roles });
}

// Method -------  DELETE
// Api   --------  http://localhost:5000/roles/:id
// Description -- DELETE ROLES FUNCTION

async function deleteRoles(req, res) {
  try {
    // FINDING ROLE EXIST OR NOT
    const findRole = await roles.find({
      role_name: req.params.id.toLowerCase(),
    });

    if (findRole.length === 0) {
      return res.status(404).send({ error: "Role not defined in database" });
    }

    // PERFORMING DELETE FUNCTIONALITY
    const deleteRole = await roles.deleteOne({
      role_name: req.params.id.toLowerCase(),
    });

    return res.status(200).send("Role deleted successfully!");
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
}

// Method -------  DELETE
// Api   --------  http://localhost:5000/roles/:id
// Description -- update ROLES FUNCTION

async function updateRole(req, res) {
  // ROLE RECORD ID TO UPDATE
  const updateRoleID = req.params.id;

  // ROLE RECORD OLD DATA
  const role_old_data = await roles.findOne({
    role_name: updateRoleID.toLowerCase(),
  });

  console.log(role_old_data.role_name);

  // ROLE RECORD NEW DATA
  const { role_name, status } = req.body;

  // ROLE NEW OBJECT TO UPDATE

  const UpdateAction = await roles.updateOne(
    {
      role_name: role_old_data.role_name,
    },

    {
      $set: {
        status,
      },
    }
  );

  return res.send({ message: "user updated successfully" });
}

//--EXPORT FUNCTIONS
module.exports = { createRoles, getRoles, deleteRoles, updateRole };


// async function updateRole(req, res) {
//   try {
//     // Get the role ID from params (or role_name if that's how you want to find it)
//     const updateRoleID = req.params.id;

//     // Find the role by role_name (make sure it's case-insensitive)
//     const role_old_data = await roles.findOne({
//       role_name: updateRoleID.toLowerCase(),
//     });

//     // Check if the role exists
//     if (!role_old_data) {
//       return res.status(404).send({ message: "Role not found" });
//     }

//     console.log("Old Role Name:", role_old_data.role_name);

//     // Get the new data from the request body
//     const { role_name, status } = req.body;

//     // Update the role's status
//     const UpdateAction = await roles.updateOne(
//       { _id: role_old_data._id }, // Using _id to uniquely identify the role
//       {
//         $set: {
//           role_name: role_name || role_old_data.role_name, // Ensure role_name remains the same unless it's being updated
//           status: status,
//         },
//       }
//     );

//     // Check if the update was successful
//     if (UpdateAction.modifiedCount === 0) {
//       return res.status(400).send({ message: "No changes made" });
//     }

//     // Send success response
//     return res.send({ message: "Role updated successfully" });
//   } catch (error) {
//     console.error("Error updating role:", error);
//     return res.status(500).send({ message: "Server error" });
//   }
// }
