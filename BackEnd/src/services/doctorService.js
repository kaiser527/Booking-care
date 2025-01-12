import db from "../models/index";

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
      if (
        !data.doctorId ||
        !data.contentHTML ||
        !data.contentMarkdown ||
        !data.action
      )
        resolve({
          errCode: 1,
          errMessage: "Missing required paramenter!",
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
          attributes: {
            exclude: ["password"],
          },
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
            exclude: ["specialtyId", "clinicId"],
          },
        });
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

export {
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailInfoDoctor,
  getDetailDoctorByIdService,
  getDoctorMarkdownById,
};
