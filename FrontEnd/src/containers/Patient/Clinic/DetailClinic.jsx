import { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
import "./DetailClinic.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { getDetailClinicById } from "../../../services/clinicService";

const DetailClinic = () => {
  const [arrDoctorId, setArrDoctorId] = useState([]);
  const [detailClinic, setDetailClinic] = useState({});

  const params = useParams();

  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    fetchClinicById("ALL");
  }, []);

  useEffect(() => {
    getDoctorId();
    return () => {
      setArrDoctorId([]);
    };
  }, [detailClinic]);

  const getDoctorId = () => {
    let arrDoctorId = [];
    if (detailClinic && !_.isEmpty(detailClinic)) {
      let arr = detailClinic.doctorClinic;
      if (arr && arr.length > 0) {
        arr.map((item) => {
          arrDoctorId.push(item.doctorId);
        });
      }
    }
    setArrDoctorId(arrDoctorId);
  };

  const fetchClinicById = async () => {
    let res = await getDetailClinicById(params.id);
    setDetailClinic(res && res.errCode === 0 ? res.data : {});
  };

  return (
    <div className="detail-specialty-container">
      <SectionHeader />
      <div className="detail-specialty-body">
        <div className="specialty-description">
          {detailClinic && !_.isEmpty(detailClinic) && (
            <>
              <div>
                {language === LANGUAGES.VI
                  ? detailClinic.nameVi
                  : detailClinic.nameEn}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: detailClinic.descriptionHTML,
                }}
              ></div>
            </>
          )}
        </div>
        {arrDoctorId &&
          arrDoctorId.length > 0 &&
          arrDoctorId.map((item, index) => {
            return (
              <div key={`doctor-schedule-${index}`} className="each-doctor">
                <div className="dt-content-left">
                  <div className="profile-doctor">
                    <ProfileDoctor
                      isShowDescDoctor={true}
                      doctorIdFromParent={item}
                      isShowLinkDetail={true}
                      isShowPrice={false}
                    />
                  </div>
                </div>
                <div className="dt-content-right">
                  <div className="doctor-schedule">
                    <DoctorSchedule doctorIdFromParent={item} />
                  </div>
                  <div className="doctor-exta-info">
                    <DoctorExtraInfor doctorIdFromParent={item} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DetailClinic;
