import "./ProfileDoctor.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "../../../store/actions";
import { useParams } from "react-router-dom";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";

const ProfileDoctor = () => {
  const profileDoctor = useSelector((state) => state.doctor.profileDoctor);
  const language = useSelector((state) => state.app.language);

  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(actions.getProfileDoctorRedux(params.id));
  }, []);

  return (
    <div className="profile-doctor-container">
      <div className="intro-doctor">
        <div
          className="content-left"
          style={{
            backgroundImage: `url(${
              profileDoctor && profileDoctor.image ? profileDoctor.image : ""
            })`,
            backgroundSize: "130px 115px",
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
            {profileDoctor &&
              profileDoctor.Markdown &&
              profileDoctor.Markdown.description && (
                <span>{profileDoctor.Markdown.description}</span>
              )}
          </div>
        </div>
      </div>
      <div className="price">
        Giá khám:{" "}
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
