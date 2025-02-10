import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./DetailDoctor.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import SectionHeader from "../SectionHeader";

const DetailDoctor = (props) => {
  const params = useParams();

  const dispatch = useDispatch();

  const location = useLocation();

  let pathName = location.pathname.split("/")[1];

  const detailDoctor = useSelector((state) => state.doctor.detailDoctor);
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    if (params && params.id && pathName === "detail-doctor") {
      dispatch(actions.getDetailDoctorRedux(params.id));
    }
  }, []);

  return (
    <>
      <SectionHeader />
      <div className="doctor-detail-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                detailDoctor && detailDoctor.image ? detailDoctor.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {detailDoctor && detailDoctor.positionData && (
                <>
                  {language === LANGUAGES.VI
                    ? `${detailDoctor.positionData.valueVi}, ${detailDoctor.fullName}`
                    : `${detailDoctor.positionData.valueEn}, ${detailDoctor.fullName}`}
                </>
              )}
            </div>
            <div className="down">
              {detailDoctor &&
                detailDoctor.Markdown &&
                detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
            </div>
          </div>
        </div>
        <div className="schedule-doctor">
          <div className="content-left">
            <DoctorSchedule />
          </div>
          <div className="content-right">
            <DoctorExtraInfor />
          </div>
        </div>
        <div className="detail-info-doctor">
          {detailDoctor &&
            detailDoctor.Markdown &&
            detailDoctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
            )}
        </div>
        <div className="comment-doctor"></div>
      </div>
    </>
  );
};

export default DetailDoctor;
