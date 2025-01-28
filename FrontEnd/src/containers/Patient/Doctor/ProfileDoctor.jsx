import "./ProfileDoctor.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "../../../store/actions";
import { useParams } from "react-router-dom";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import localization from "moment/locale/vi";

const ProfileDoctor = (props) => {
  const { isShowDescDoctor, dataScheduleTimeModal } = props;

  const profileDoctor = useSelector((state) => state.doctor.profileDoctor);
  const language = useSelector((state) => state.app.language);

  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(actions.getProfileDoctorRedux(params.id));
  }, []);

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const renderTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let date =
        language === LANGUAGES.VI
          ? capitalizeFirstLetter(
              moment(dataTime.date).format("dddd - DD/MM/YYYY")
            )
          : moment(dataTime.date).locale("en").format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {language === LANGUAGES.VI
              ? dataTime.scheduleData.valueVi
              : dataTime.scheduleData.valueEn}{" "}
            - {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.free-booking" />
          </div>
        </>
      );
    }
  };

  return (
    <div className="profile-doctor-container">
      <div className="intro-doctor">
        <div
          className="content-left"
          style={{
            backgroundImage: `url(${
              profileDoctor && profileDoctor.image ? profileDoctor.image : ""
            })`,
          }}
        ></div>
        <div className="content-right">
          <div className="up">
            {profileDoctor && profileDoctor.positionData && (
              <>
                {language === LANGUAGES.VI
                  ? `${profileDoctor.positionData.valueVi}, ${profileDoctor.fullName}`
                  : `${profileDoctor.positionData.valueEn}, ${profileDoctor.fullName}`}
              </>
            )}
          </div>
          <div className="down">
            {isShowDescDoctor ? (
              <>
                {profileDoctor &&
                  profileDoctor.Markdown &&
                  profileDoctor.Markdown.description && (
                    <span>{profileDoctor.Markdown.description}</span>
                  )}
              </>
            ) : (
              <>{renderTimeBooking(dataScheduleTimeModal)}</>
            )}
          </div>
        </div>
      </div>
      <div className="price">
        <FormattedMessage id="patient.booking-modal.price" />:{" "}
        {profileDoctor &&
          profileDoctor.infoData &&
          profileDoctor.infoData.priceData && (
            <NumberFormat
              value={
                language === LANGUAGES.VI
                  ? profileDoctor.infoData.priceData.valueVi
                  : profileDoctor.infoData.priceData.valueEn
              }
              className="currency"
              displayType={"text"}
              thousandSeparator={true}
              suffix={language === LANGUAGES.VI ? "đ" : "$"}
            />
          )}
      </div>
    </div>
  );
};

export default ProfileDoctor;
