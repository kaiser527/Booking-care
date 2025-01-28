require("dotenv").config();
import db from "../models/index";
import { sendSimpleEmail } from "./emailService";
import { v4 as uuidv4 } from "uuid";

const checkValidInput = (data) => {
  let isValid = true;
  let arrInput = ["email", "doctorId", "timeType", "date", "fullName"];
  for (let i = 0; i < arrInput.length; i++) {
    if (!data[arrInput[i]]) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

const buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

const postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (checkValidInput(data) === false) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      } else {
        let token = uuidv4();
        await sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
          attributes: ["id"],
          raw: true,
        });
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          message: "Save infor patient succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getGenderPatientService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allcode = await db.Allcode.findAll({
        where: { type: "GENDER" },
      });
      resolve({
        errCode: 0,
        message: "Ok",
        data: allcode,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const postVerifyBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: { statusId: "S1", doctorId: data.doctorId, token: data.token },
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            message: "Update the appointment succeed!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exist!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

export {
  postVerifyBookAppointmentService,
  postBookAppointmentService,
  getGenderPatientService,
};
