import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

const OutStandingDoctor = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const listTopDoctors = useSelector((state) => state.doctor.topdoctors);

  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    dispatch(actions.fetchTopDoctor());
  }, []);

  const handleViewDetailDoctor = (doctor) => {
    history.push(`/detail-doctor/${doctor.id}`);
  };

  return (
    <>
      <div className="section-outstanding-doctor section-share">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.out-standing-doctor" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...props.settings}>
              {listTopDoctors &&
                listTopDoctors.length > 0 &&
                listTopDoctors.map((doctor, index) => {
                  let imageBase64 = "";
                  if (doctor.image) {
                    imageBase64 = new Buffer(doctor.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${doctor.positionData.valueVi}, ${doctor.fullName}`;
                  let nameEn = `${doctor.positionData.valueEn}, ${doctor.fullName}`;
                  return (
                    <div
                      key={`top-doctor-${index}`}
                      className="section-customize"
                      onClick={() => handleViewDetailDoctor(doctor)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>Cơ Xương Khớp</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutStandingDoctor;
