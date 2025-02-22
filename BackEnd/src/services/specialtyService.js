import db from "../models/index";
import { Op } from "sequelize";

const checkValidInput = (data) => {
  let isValid = true;
  let arrInput = [
    "language",
    "action",
    "image",
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

const createNewSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (checkValidInput(data) === false) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      } else {
        let isExist = await db.Specialty.findOne({
          where: {
            [Op.or]: [{ nameVi: data.nameVi }, { nameEn: data.nameEn }],
          },
          attributes: ["nameVi", "nameEn"],
        });
        if (isExist) {
          resolve({
            errCode: 2,
            errMessage: `The specialty already exists`,
          });
        } else {
          if (data.action === "CREATE")
            await db.Specialty.create({
              nameVi: data.nameVi,
              nameEn: data.nameEn,
              image: data.image,
              descriptionHTML: data.descriptionHTML,
              descriptionMarkdown: data.descriptionMarkdown,
            });
          else if (data.action === "EDIT") {
            let specialty = await db.Specialty.findOne({
              where: { id: data.id },
            });
            if (specialty) {
              if (data.language === "vi") specialty.nameVi = data.nameVi;
              if (data.language === "en") specialty.nameEn = data.nameEn;
              specialty.image = data.image;
              specialty.descriptionHTML = data.descriptionHTML;
              specialty.descriptionMarkdown = data.descriptionMarkdown;

              await specialty.save();
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

const getAllSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
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

const getSpecialtyByIdService = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      } else {
        const includeCondition =
          location !== "ALL"
            ? [
                {
                  model: db.Doctor_infor,
                  where: { provinceId: location },
                  as: "doctorSpecialty",
                  attributes: ["doctorId", "provinceId"],
                },
              ]
            : [
                {
                  model: db.Doctor_infor,
                  as: "doctorSpecialty",
                  attributes: ["doctorId", "provinceId"],
                },
              ];
        let data = await db.Specialty.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
          include: includeCondition,
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

const getProvinceSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allcode = await db.Allcode.findAll({
        where: { type: "PROVINCE" },
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

export {
  createNewSpecialtyService,
  getSpecialtyByIdService,
  getAllSpecialtyService,
  getProvinceSpecialtyService,
};
