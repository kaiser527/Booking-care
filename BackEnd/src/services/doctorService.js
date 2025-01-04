const db = require("../models/index");

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
        ],
      });
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

const saveDetailInfoDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.contentHTML || !data.contentMarkdown)
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
        });
      else {
        await db.Markdown.create({
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          description: data.description,
          doctorId: data.doctorId,
        });
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

module.exports = {
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailInfoDoctor,
};
