import {
  createNewSpecialtyService,
  getAllSpecialtyService,
} from "../services/specialtyService";

const createNewSpecialty = async (req, res) => {
  try {
    let message = await createNewSpecialtyService(req.body);
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
    console.log(e);
  }
};

const getAllSpecialty = async (req, res) => {
  try {
    let message = await getAllSpecialtyService();
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
    console.log(e);
  }
};

export { createNewSpecialty, getAllSpecialty };
