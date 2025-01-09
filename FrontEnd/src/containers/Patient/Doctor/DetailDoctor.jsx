import React, { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

const DetailDoctor = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const detailDoctor = useSelector((state) => state.doctor.detailDoctor);
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    if (params && params.id) {
      dispatch(actions.getDetailDoctorRedux(params.id));
    }
  }, []);

  return (
    <>
      <HomeHeader isShowBanner={false} />
      <div className="doctor-detail-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                detailDoctor && detailDoctor.image ? detailDoctor.image : ""
              })`,
              backgroundSize: "150px 135px",
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
        <div className="schedule-doctor"></div>
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
