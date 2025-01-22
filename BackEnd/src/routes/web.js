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
  handleLogout,
} from "../controllers/userController";
import {
  getTopDoctorHome,
  getAllDoctors,
  postInfoDoctor,
  getDetailDoctorById,
  getDoctorMarkdown,
  bulkCreateSchedule,
  getScheduleByDate,
  deletePastScheduleDoctor,
  getPastDoctorSchedule,
} from "../controllers/doctorController";
import { checkUserJWT, checkUserPermisson } from "../middlewares/JWTAction";

//check user permission
router.all("*", checkUserJWT, checkUserPermisson);

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
router.post("/api/logout", handleLogout);
router.get("/api/get-all-users", handleGetAllUsers);
router.post("/api/create-new-user", handleCreateNewUser);
router.put("/api/edit-user", handleEditUser);
router.delete("/api/delete-user", handleDeleteUser);

//api doctors
router.get("/api/top-doctor-home", getTopDoctorHome);
router.get("/api/get-all-doctors", getAllDoctors);
router.post("/api/save-info-doctor", postInfoDoctor);
router.post("/api/bulk-create-schedule", bulkCreateSchedule);
router.get("/api/get-detail-doctor-by-id", getDetailDoctorById);
router.get("/api/get-doctor-markdown-by-id", getDoctorMarkdown);
router.get("/api/get-schedule-doctor-by-date", getScheduleByDate);
router.delete("/api/delete-past-schedule-doctor", deletePastScheduleDoctor);
router.get("/api/get-past-doctor-schedule", getPastDoctorSchedule);

//api all code
router.get("/api/allcode", getAllCode);

export default router;
