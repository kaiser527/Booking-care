import { useLocation } from "react-router-dom";
import "./VerifyEmail.scss";
import { useEffect, useState } from "react";
import HomeHeader from "../HomePage/HomeHeader";
import { FormattedMessage } from "react-intl";
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
          <div>
            <FormattedMessage id="patient.verify-booking.loading" />
          </div>
        ) : (
          <div>
            {errCode === 0 ? (
              <div className="infor-booking">
                <FormattedMessage id="patient.verify-booking.success" />
              </div>
            ) : (
              <div className="infor-booking">
                <FormattedMessage id="patient.verify-booking.error" />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
