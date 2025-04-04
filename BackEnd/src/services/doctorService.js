require("dotenv").config();
import db from "../models/index";
import _ from "lodash";
import moment from "moment";

const getTopDoctorHomeService = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        raw: true,
        nest: true,
        where: { roleId: "R2" },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Doctor_infor,
            as: "infoData",
            attributes: ["specialtyId"],
            include: [
              {
                model: db.Specialty,
                as: "doctorSpecialty",
                attributes: ["nameVi", "nameEn"],
              },
            ],
          },
        ],
      });
      if (users && users.length > 0) {
        users.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
        });
      }
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllDoctorsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        attributes: {
          exclude: ["password", "image"],
        },
        where: { roleId: "R2" },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const checkInput = (data) => {
  let isValid = true;
  let element = "";
  let arrInput = [
    "doctorId",
    "contentHTML",
    "contentMarkdown",
    "action",
    "selectedPrice",
    "selectedPayment",
    "selectedProvince",
    "clinicName",
    "clinicAddress",
    "note",
    "specialtyId",
    "clinicId",
  ];
  for (let i = 0; i < arrInput.length; i++) {
    if (!data[arrInput[i]]) {
      isValid = false;
      element = arrInput[i];
      break;
    }
  }
  return { isValid, element };
};

const saveDetailInfoDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (checkInput(data).isValid === false)
        resolve({
          errCode: 1,
          errMessage: `Missing required paramenter: ${
            checkInput(data).element
          }`,
        });
      else {
        if (data.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
            description: data.description,
            doctorId: data.doctorId,
          });
        } else if (data.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: data.doctorId },
            raw: false,
          });
          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = data.contentHTML;
            doctorMarkdown.contentMarkdown = data.contentMarkdown;
            doctorMarkdown.description = data.description;

            await doctorMarkdown.save();
          }
        }
        let doctorInfo = await db.Doctor_infor.findOne({
          where: { doctorId: data.doctorId },
          raw: false,
        });
        if (doctorInfo) {
          doctorInfo.priceId = data.selectedPrice;
          doctorInfo.provinceId = data.selectedProvince;
          doctorInfo.paymentId = data.selectedPayment;
          doctorInfo.nameClinic = data.clinicName;
          doctorInfo.addressClinic = data.clinicAddress;
          doctorInfo.note = data.note;
          doctorInfo.specialtyId = data.specialtyId;
          doctorInfo.clinicId = data.clinicId;

          await doctorInfo.save();
        } else {
          await db.Doctor_infor.create({
            doctorId: data.doctorId,
            priceId: data.selectedPrice,
            provinceId: data.selectedProvince,
            paymentId: data.selectedPayment,
            nameClinic: data.clinicName,
            addressClinic: data.clinicAddress,
            note: data.note,
            specialtyId: data.specialtyId,
            clinicId: data.clinicId,
          });
        }
        resolve({
          errCode: 0,
          message: "Save doctor info succeed!",
        });
      }
      await db.User.create({});
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailDoctorByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id)
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      else {
        let data = await db.User.findOne({
          where: { id: id, roleId: "R2" },
          attributes: ["image", "fullName"],
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_infor,
              as: "infoData",
              attributes: {
                exclude: ["id", "createdAt", "updatedAt", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDoctorMarkdownById = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId)
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      else {
        let results = await db.Markdown.findOne({
          where: { doctorId: doctorId },
          attributes: {
            exclude: ["specialtyId", "clinicId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.Doctor_infor,
              as: "infoDataMarkdown",
              attributes: [
                "priceId",
                "provinceId",
                "paymentId",
                "note",
                "addressClinic",
                "nameClinic",
                "specialtyId",
                "clinicId",
              ],
            },
          ],
        });
        if (!results) results = {};
        resolve({
          errCode: 0,
          data: results,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const bulkCreateScheduleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = +process.env.MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        let existing = await db.Schedule.findAll({
          where: {
            doctorId: data.doctorId,
            date: data.date,
          },
          raw: true,
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
        });
        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            item.date = new Date(item.date).getTime();
            return item;
          });
        }
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        });
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getScheduleByDateService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: date },
          include: [
            {
              model: db.Allcode,
              as: "scheduleData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.User,
              as: "scheduleUserData",
              attributes: ["fullName"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (!dataSchedule) dataSchedule = [];
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deletePastScheduleDoctorService = (date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      } else {
        let currentDate = moment(new Date()).format("YYYY-MM-DD");
        if (date < currentDate) {
          let dateDelete = await db.Schedule.findOne({
            where: { date: date },
          });
          if (dateDelete) {
            await db.Schedule.destroy({
              where: { date: date },
            });
            resolve({
              errCode: 0,
              message: "Delete past date succeed!",
            });
          } else {
            resolve({
              errCode: 2,
              errMessage: "Not found date",
            });
          }
        } else {
          resolve({
            errCode: 2,
            errMessage: "Invalid date",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getPastDoctorScheduleService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let results = await db.Schedule.findAll({
        raw: true,
        attributes: ["date", "doctorId"],
      });
      let formattedResults = [];
      let currentDate = moment(new Date()).format("YYYY-MM-DD");
      results.map((item, index) => {
        let obj = {};
        let formattedDate = moment(item.date).format("YYYY-MM-DD");
        obj.date = formattedDate;
        obj.doctorId = item.doctorId;
        if (formattedDate < currentDate) formattedResults.push(obj);
      });
      resolve({
        errCode: 0,
        data: formattedResults,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getProfileDoctorByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      } else {
        let results = await db.User.findOne({
          where: { id: id, roleId: "R2" },
          attributes: {
            exclude: ["password", "id", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Markdown,
              attributes: ["description"],
            },
            {
              model: db.Doctor_infor,
              as: "infoData",
              attributes: {
                exclude: ["id", "createdAt", "updatedAt", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (results && results.image) {
          results.image = new Buffer(results.image, "base64").toString(
            "binary"
          );
        }
        if (!results) results = {};
        resolve({
          errCode: 0,
          data: results,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getListPatientForDoctorService = (page, limit, doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!date || !doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      } else {
        const offset = (page - 1) * limit;
        const { count, rows } = await db.Booking.findAndCountAll({
          offset: offset,
          limit: limit,
          where: { statusId: "S2", date: date, doctorId: doctorId },
          include: [
            {
              model: db.User,
              attributes: ["email", "fullName", "address", "gender"],
              as: "userData",
              include: [
                {
                  model: db.Allcode,
                  attributes: ["valueVi", "valueEn"],
                  as: "genderData",
                },
              ],
            },
            {
              model: db.Allcode,
              attributes: ["valueEn", "valueVi"],
              as: "timeData",
            },
          ],
          nest: true,
          raw: false,
        });
        const data = {
          totalRows: count,
          totalPages: Math.ceil(count / limit),
          patients: rows,
        };
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export {
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailInfoDoctor,
  getDetailDoctorByIdService,
  getDoctorMarkdownById,
  bulkCreateScheduleService,
  getScheduleByDateService,
  deletePastScheduleDoctorService,
  getPastDoctorScheduleService,
  getProfileDoctorByIdService,
  getListPatientForDoctorService,
};
