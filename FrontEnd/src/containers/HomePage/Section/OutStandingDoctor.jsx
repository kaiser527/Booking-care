import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import "./OutStandingDoctor.scss";

const OutStandingDoctor = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const listTopDoctors = useSelector((state) => state.doctor.topdoctors);
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    dispatch(actions.fetchTopDoctor());
  }, []);

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
                  let nameVi = `${doctor.positionData.valueVi}, ${doctor.fullName}`;
                  let nameEn = `${doctor.positionData.valueEn}, ${doctor.fullName}`;
                  return (
                    <div
                      key={`top-doctor-${index}`}
                      className="section-customize outstanding-doctor-child"
                      onClick={() =>
                        history.push(`/detail-doctor/${doctor.id}`)
                      }
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{
                              backgroundImage: `url(${doctor.image})`,
                            }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div className="doctor-name">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>
                            {language === LANGUAGES.VI
                              ? doctor.infoData.doctorSpecialty.nameVi
                              : doctor.infoData.doctorSpecialty.nameEn}
                          </div>
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
