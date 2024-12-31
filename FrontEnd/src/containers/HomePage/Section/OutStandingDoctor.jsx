import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

const OutStandingDoctor = (props) => {
  const [listTopDoctors, setListTopDoctors] = useState([]);

  const dispatch = useDispatch();

  const topdoctors = useSelector((state) => state.admin.topdoctors);
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    dispatch(actions.fetchTopDoctor());
  }, []);

  useEffect(() => {
    setListTopDoctors(topdoctors);
  }, [topdoctors]);

  return (
    <>
      <div className="section-outstanding-doctor section-share">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-section">Xem thêm</button>
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
