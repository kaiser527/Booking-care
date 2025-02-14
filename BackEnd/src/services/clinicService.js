import db from "../models/index";
import { Op } from "sequelize";

const checkValidInput = (data) => {
  let isValid = true;
  let arrInput = [
    "language",
    "action",
    "image",
    "address",
    "descriptionHTML",
    "descriptionMarkdown",
  ];
  for (let i = 0; i < arrInput.length; i++) {
    if (!data[arrInput[i]]) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

const createNewClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (checkValidInput(data) === false) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      } else {
        let isExist = await db.Clinic.findOne({
          where: {
            [Op.or]: [{ nameVi: data.nameVi }, { nameEn: data.nameEn }],
          },
          attributes: ["nameVi", "nameEn"],
        });
        if (isExist) {
          resolve({
            errCode: 2,
            errMessage: `The Clinic already exists`,
          });
        } else {
          if (data.action === "CREATE")
            await db.Clinic.create({
              nameVi: data.nameVi,
              nameEn: data.nameEn,
              image: data.image,
              address: data.address,
              descriptionHTML: data.descriptionHTML,
              descriptionMarkdown: data.descriptionMarkdown,
            });
          else if (data.action === "EDIT") {
            let clinic = await db.Clinic.findOne({
              where: { id: data.id },
            });
            if (clinic) {
              if (data.language === "vi") clinic.nameVi = data.nameVi;
              if (data.language === "en") clinic.nameEn = data.nameEn;
              clinic.image = data.image;
              clinic.descriptionHTML = data.descriptionHTML;
              clinic.descriptionMarkdown = data.descriptionMarkdown;
              clinic.address = data.address;

              await clinic.save();
            }
          }
          resolve({
            errCode: 0,
            message: "OK",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllClinicService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item, index) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
        });
      }
      resolve({
        errCode: 0,
        message: "OK",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailClinicByIdService = async (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: [
            "descriptionHTML",
            "descriptionMarkdown",
            "address",
            "nameVi",
            "nameEn",
          ],
          include: [
            {
              model: db.Doctor_infor,
              as: "doctorClinic",
              attributes: ["doctorId"],
            },
          ],
        });
        resolve({
          errCode: 0,
          message: "OK",
          data: data ? data : {},
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export {
  createNewClinicService,
  getDetailClinicByIdService,
  getAllClinicService,
};
