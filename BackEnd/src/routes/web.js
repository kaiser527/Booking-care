const express = require("express"); //import express
const router = express.Router(); //khai bao router
const {
  getHomePage,
  getCRUDPage,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
} = require("../controllers/homeControllers");
const {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
} = require("../controllers/userController");
const {
  getTopDoctorHome,
  getAllDoctors,
  postInfoDoctor,
} = require("../controllers/doctorController");

//crud
router.get("/", getHomePage);
router.get("/crud", getCRUDPage);
router.get("/get-crud", displayGetCRUD);
router.get("/edit-crud", getEditCRUD);
router.post("/post-crud", postCRUD);
router.post("/put-crud", putCRUD);
router.get("/delete-crud", deleteCRUD);

//api users
router.post("/api/login", handleLogin);
router.get("/api/get-all-users", handleGetAllUsers);
router.post("/api/create-new-user", handleCreateNewUser);
router.put("/api/edit-user", handleEditUser);
router.delete("/api/delete-user", handleDeleteUser);

//api doctors
router.get("/api/top-doctor-home", getTopDoctorHome);
router.get("/api/get-all-doctors", getAllDoctors);
router.post("/api/save-info-doctor", postInfoDoctor);

//api all code
router.get("/api/allcode", getAllCode);

module.exports = router;
