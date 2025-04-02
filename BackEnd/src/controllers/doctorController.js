import {
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

const bulkCreateSchedule = async (req, res) => {
  try {
    let response = await bulkCreateScheduleService(req.body);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const getScheduleByDate = async (req, res) => {
  try {
    let response = await getScheduleByDateService(
      req.query.doctorId,
      req.query.date
    );
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const deletePastScheduleDoctor = async (req, res) => {
  try {
    let response = await deletePastScheduleDoctorService(req.query.date);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const getPastDoctorSchedule = async (req, res) => {
  try {
    let response = await getPastDoctorScheduleService();
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const getProfileDoctorById = async (req, res) => {
  try {
    let response = await getProfileDoctorByIdService(req.query.id);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const getListPatientForDoctor = async (req, res) => {
  try {
    let { page, limit, doctorId, date } = req.query;
    let response = await getListPatientForDoctorService(
      +page,
      +limit,
      doctorId,
      date
    );
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
  bulkCreateSchedule,
  getScheduleByDate,
  deletePastScheduleDoctor,
  getPastDoctorSchedule,
  getProfileDoctorById,
  getListPatientForDoctor,
};
