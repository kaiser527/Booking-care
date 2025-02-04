import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils";

const Specialty = (props) => {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.app.language);
  const specialties = useSelector((state) => state.specialty.specialties);

  useEffect(() => {
    dispatch(actions.fetchAllSpecialtyRedux());
  }, []);

  return (
    <div className="section-specialty section-share">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.popular-specialty" />
          </span>
          <button className="btn-section">
            <FormattedMessage id="homepage.more-info" />
          </button>
        </div>
        <div className="section-body">
          <Slider {...props.settings}>
            {specialties &&
              specialties.length > 0 &&
              specialties.map((item, index) => {
                return (
                  <div key={`specialty-${index}`} className="section-customize">
                    <div
                      className="bg-image section-specialty"
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    ></div>
                    <div>
                      {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Specialty;
