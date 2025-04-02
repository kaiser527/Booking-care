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
  postForgotPassword,
  postResetPassword,
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
  getProfileDoctorById,
  getListPatientForDoctor,
} from "../controllers/doctorController";
import { checkUserJWT, checkUserPermisson } from "../middlewares/JWTAction";
import {
  postBookAppointment,
  getGenderPatient,
  postVerifyBookAppointment,
} from "../controllers/patientController";
import {
  createNewSpecialty,
  getAllSpecialty,
  getSpecialtyById,
  getProvinceSpecialty,
} from "../controllers/specialtyController";
import {
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
} from "../controllers/clinicController";

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
router.post("/api/forgot-password", postForgotPassword);
router.post("/api/reset-user-password", postResetPassword);

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
router.get("/api/get-profile-doctor-by-id", getProfileDoctorById);
router.get("/api/get-list-patient-for-doctor", getListPatientForDoctor);

//api patient book appointment
router.post("/api/patient-book-appointment", postBookAppointment);
router.get("/api/get-gender-patient", getGenderPatient);
router.post("/api/verify-book-appointment", postVerifyBookAppointment);

//api specialty
router.post("/api/create-new-specialty", createNewSpecialty);
router.get("/api/get-all-specialties", getAllSpecialty);
router.get("/api/get-detail-specialty-by-id", getSpecialtyById);
router.get("/api/get-province-specialty", getProvinceSpecialty);

//api clinic
router.post("/api/create-new-clinic", createNewClinic);
router.get("/api/get-all-clinics", getAllClinic);
router.get("/api/get-detail-clinic-by-id", getDetailClinicById);

//api all code
router.get("/api/allcode", getAllCode);

export default router;
