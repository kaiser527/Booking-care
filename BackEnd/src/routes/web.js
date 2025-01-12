import express from "express";

const router = express.Router(); //khai bao router

import {
  getHomePage,
  getCRUDPage,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
} from "../controllers/homeControllers";
import {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
} from "../controllers/userController";
import {
  getTopDoctorHome,
  getAllDoctors,
  postInfoDoctor,
  getDetailDoctorById,
  getDoctorMarkdown,
} from "../controllers/doctorController";

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
router.get("/api/get-detail-doctor-by-id", getDetailDoctorById);
router.get("/api/get-doctor-markdown-by-id", getDoctorMarkdown);

//api all code
router.get("/api/allcode", getAllCode);

export default router;
