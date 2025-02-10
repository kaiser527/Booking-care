import { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
import "./DetailSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { useParams } from "react-router-dom";
import _ from "lodash";
import {
  getSpecialtyById,
  getProvinceSpecialty,
} from "../../../services/specialtyService";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";

const DetailSpecialty = () => {
  const [arrDoctorId, setArrDoctorId] = useState([]);
  const [detailSpecialty, setDetailSpecialty] = useState({});
  const [listProvince, setListProvince] = useState([]);

  const params = useParams();

  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    fetchSpecialtyById("ALL");
    getProvince();
    return () => {
      setListProvince([]);
      setDetailSpecialty({});
    };
  }, []);

  useEffect(() => {
    getDoctorId();
    return () => {
      setArrDoctorId([]);
    };
  }, [detailSpecialty]);

  const getDoctorId = () => {
    let arrDoctorId = [];
    if (detailSpecialty && !_.isEmpty(detailSpecialty)) {
      let arr = detailSpecialty.doctorSpecialty;
      if (arr && arr.length > 0) {
        arr.map((item) => {
          arrDoctorId.push(item.doctorId);
        });
      }
    }
    setArrDoctorId(arrDoctorId);
  };

  const fetchSpecialtyById = async (location) => {
    let res = await getSpecialtyById(params.id, location);
    setDetailSpecialty(res && res.errCode === 0 ? res.data : {});
  };

  const getProvince = async () => {
    let res = await getProvinceSpecialty();
    let dataProvince = res.data;
    if (dataProvince && dataProvince.length > 0) {
      dataProvince.unshift({
        keyMap: "ALL",
        valueVi: "Toàn Quốc",
        valueEn: "All",
      });
    }
    setListProvince(dataProvince ? dataProvince : []);
  };

  const handleOnchangeSelect = async (e) => {
    await fetchSpecialtyById(e.target.value);
  };

  return (
    <div className="detail-specialty-container">
      <SectionHeader />
      <div className="detail-specialty-body">
        <div className="specialty-description">
          {detailSpecialty && !_.isEmpty(detailSpecialty) && (
            <div
              dangerouslySetInnerHTML={{
                __html: detailSpecialty.descriptionHTML,
              }}
            ></div>
          )}
        </div>
        <div className="search-sp-doctor">
          <select onChange={(e) => handleOnchangeSelect(e)}>
            {listProvince &&
              listProvince.length > 0 &&
              listProvince.map((item, index) => {
                return (
                  <option key={`list-province-${index}`} value={item.keyMap}>
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </option>
                );
              })}
          </select>
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

export default DetailSpecialty;
