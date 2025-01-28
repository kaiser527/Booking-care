import {
  postBookAppointmentService,
  getGenderPatientService,
  postVerifyBookAppointmentService,
} from "../services/patientService";

const postBookAppointment = async (req, res) => {
  try {
    let response = await postBookAppointmentService(req.body);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const getGenderPatient = async (req, res) => {
  try {
    let response = await getGenderPatientService();
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const postVerifyBookAppointment = async (req, res) => {
  try {
    let response = await postVerifyBookAppointmentService(req.body);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

export { postBookAppointment, getGenderPatient, postVerifyBookAppointment };
