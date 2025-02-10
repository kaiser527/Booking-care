import "./ProfileDoctor.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import localization from "moment/locale/vi";
import { getProfileDoctor } from "../../../services/doctorService";

const ProfileDoctor = (props) => {
  const {
    isShowDescDoctor,
    isShowLinkDetail,
    isShowPrice,
    doctorIdFromParent,
    dataScheduleTimeModal,
  } = props;
  const [profileDoctor, setProfileDoctor] = useState({});

  const language = useSelector((state) => state.app.language);

  const params = useParams();

  const location = useLocation();

  const history = useHistory();

  let pathName = location.pathname.split("/")[1];

  useEffect(() => {
    getAllProfileDoctor();
  }, [doctorIdFromParent]);

  const getAllProfileDoctor = async () => {
    let res = await getProfileDoctor(
      pathName === "detail-doctor" ? params.id : doctorIdFromParent
    );
    if (res && res.errCode === 0) setProfileDoctor(res.data);
  };

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
      {isShowLinkDetail && (
        <div
          className="view-detail-doctor"
          onClick={() => history.push(`/detail-doctor/${doctorIdFromParent}`)}
        >
          <FormattedMessage id="patient.profile-doctor.link-detail" />
        </div>
      )}
      {isShowPrice && (
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
      )}
    </div>
  );
};

export default ProfileDoctor;
