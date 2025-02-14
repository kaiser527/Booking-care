import {
  createNewClinicService,
  getAllClinicService,
  getDetailClinicByIdService,
} from "../services/clinicService";

const createNewClinic = async (req, res) => {
  try {
    let message = await createNewClinicService(req.body);
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
    console.log(e);
  }
};

const getAllClinic = async (req, res) => {
  try {
    let message = await getAllClinicService();
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
    console.log(e);
  }
};

const getDetailClinicById = async (req, res) => {
  try {
    let message = await getDetailClinicByIdService(req.query.id);
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
    console.log(e);
  }
};

export { createNewClinic, getAllClinic, getDetailClinicById };
