import { useLocation } from "react-router-dom";
import "./VerifyEmail.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HomeHeader from "../HomePage/HomeHeader";
import { postVerifyBookingAppointment } from "../../services/userService";

const VerifyEmail = () => {
  const [statusVerify, setStatusVerify] = useState(false);
  const [errCode, setErrCode] = useState(0);

  const location = useLocation();

  const token = location.search.split("?token=")[1].split("&")[0];

  const doctorId = location.search.split("&doctorId=")[1];

  useEffect(() => {
    verifyBookingAppointment();
  }, []);

  const verifyBookingAppointment = async () => {
    let res = await postVerifyBookingAppointment({ token, doctorId });
    if (res && res.errCode === 0) {
      setStatusVerify(true);
      setErrCode(res.errCode);
    } else {
      setStatusVerify(true);
      setErrCode(res && res.errCode ? res.errCode : -1);
    }
  };

  return (
    <>
      <HomeHeader />
      <div className="verify-email-container">
        {statusVerify === false ? (
          <div>Loading data...</div>
        ) : (
          <div>
            {errCode === 0 ? (
              <div className="infor-booking">Xác nhận lịch hẹn thành công</div>
            ) : (
              <div className="infor-booking">
                Lịch hẹn không tồn tại hoặc đã được xác nhận
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
