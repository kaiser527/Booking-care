import {
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailInfoDoctor,
  getDetailDoctorByIdService,
  getDoctorMarkdownById,
} from "../services/doctorService";

const getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await getTopDoctorHomeService(+limit);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    let doctors = await getAllDoctorsService();
    res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const postInfoDoctor = async (req, res) => {
  try {
    let response = await saveDetailInfoDoctor(req.body);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const getDetailDoctorById = async (req, res) => {
  try {
    let infor = await getDetailDoctorByIdService(req.query.id);
    res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const getDoctorMarkdown = async (req, res) => {
  try {
    let response = await getDoctorMarkdownById(req.query.id);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

export {
  getTopDoctorHome,
  getAllDoctors,
  postInfoDoctor,
  getDetailDoctorById,
  getDoctorMarkdown,
};
