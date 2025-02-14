import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./MedicalFacility.scss";

const MedicalFacility = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const language = useSelector((state) => state.app.language);
  const clinics = useSelector((state) => state.clinic.clinics);

  useEffect(() => {
    dispatch(actions.fetchAllClinicRedux());
  }, []);

  return (
    <>
      <div className="section-medical-facility section-share">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.medical-facility" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...props.settings}>
              {clinics &&
                clinics.length > 0 &&
                clinics.map((item, index) => {
                  return (
                    <div
                      key={`specialty-${index}`}
                      className="section-customize clinic-child"
                      onClick={() => history.push(`/detail-clinic/${item.id}`)}
                    >
                      <div
                        className="bg-image section-medical-facility"
                        style={{
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: "350px 220px",
                        }}
                      ></div>
                      <div className="clinic-name">
                        {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
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

export default MedicalFacility;
