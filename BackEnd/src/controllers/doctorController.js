const { getTopDoctorHomeService } = require("../services/doctorService");

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

module.exports = { getTopDoctorHome };
