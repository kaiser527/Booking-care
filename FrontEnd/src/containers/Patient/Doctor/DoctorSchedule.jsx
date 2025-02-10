import { useEffect, useState } from "react";
import moment from "moment";
import localization from "moment/locale/vi";
import { useSelector } from "react-redux";
import { dateFormat, LANGUAGES } from "../../../utils";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import "./DoctorSchedule.scss";
import BookingModal from "./Modal/BookingModal";
import { useLocation } from "react-router-dom";
import { getScheduleDoctorByDate } from "../../../services/doctorService";

const DoctorSchedule = (props) => {
  const { doctorIdFromParent } = props;

  const [allDays, setAllDays] = useState([]);
  const [isShowModalBooking, setIsShowModalBooking] = useState(false);
  const [dataScheduleTimeModal, setDataScheduleTimeModal] = useState({});
  const [doctorSchedule, setDoctorSchedule] = useState([]);

  const params = useParams();

  const location = useLocation();

  let pathName = location.pathname.split("/")[1];

  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    let allDays = getArrDays(language);
    setAllDays(allDays);
  }, [language]);

  useEffect(() => {
    getScheduleDoctor();
    return () => {
      setDoctorSchedule([]);
    };
  }, [doctorIdFromParent]);

  const getScheduleDoctor = async () => {
    let allDays = getArrDays(language);
    let formattedDate = new Date(allDays[0].value);
    if (allDays && allDays.length > 0) {
      let res = await getScheduleDoctorByDate(
        pathName === "detail-doctor" ? params.id : doctorIdFromParent,
        moment(formattedDate).format(dateFormat.SEND_TO_SERVER)
      );
      if (res && res.errCode === 0) setDoctorSchedule(res.data);
    }
  };

  const handleClickScheduleTime = (schedule) => {
    setIsShowModalBooking(true);
    setDataScheduleTimeModal(schedule);
  };

  const getToday = () => {
    let language = props.intl.formatMessage({
      id: "patient.detail-doctor.today",
    });
    let today = `${language} - ${moment(new Date()).format("DD/MM")}`;
    return today;
  };

  const getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let today = getToday();
          object.label = today;
        } else {
          object.label = capitalizeFirstLetter(
            moment(new Date()).add(i, "days").format("dddd - DD/MM")
          );
        }
      } else {
        if (i === 0) {
          let today = getToday();
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const handleOnChangeSelect = async (event) => {
    if (params && params.id) {
      let date = event.target.value;
      let formattedDate = new Date(+date);
      let res = await getScheduleDoctorByDate(
        pathName === "detail-doctor" ? params.id : doctorIdFromParent,
        moment(formattedDate).format(dateFormat.SEND_TO_SERVER)
      );
      if (res && res.errCode === 0) setDoctorSchedule(res.data);
    }
  };

  return (
    <>
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => handleOnChangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((day, index) => {
                return (
                  <option key={`all-schedule-${index}`} value={day.value}>
                    {day.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-calendar">
            <i className="fas fa-calendar-alt" aria-hidden="true">
              <span>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </i>
          </div>
          <div className="time-content">
            <div className="time-content-btn">
              {doctorSchedule && doctorSchedule.length > 0 ? (
                doctorSchedule.map((schedule, index) => {
                  return (
                    <button
                      onClick={() => handleClickScheduleTime(schedule)}
                      key={`doctor-schedule-${index}`}
                      className={
                        language === LANGUAGES.VI ? "btn-vie" : "btn-en"
                      }
                    >
                      {language === LANGUAGES.VI
                        ? schedule.scheduleData.valueVi
                        : schedule.scheduleData.valueEn}
                    </button>
                  );
                })
              ) : (
                <div className="no-schedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
            {doctorSchedule && doctorSchedule.length > 0 && (
              <div className="book-free">
                <span>
                  <FormattedMessage id="patient.detail-doctor.choose" />{" "}
                  <i className="far fa-hand-point-up"></i>{" "}
                  <FormattedMessage id="patient.detail-doctor.book" />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <BookingModal
        doctorIdFromParent={doctorIdFromParent}
        setIsShowModalBooking={setIsShowModalBooking}
        isShowModalBooking={isShowModalBooking}
        dataScheduleTimeModal={dataScheduleTimeModal}
      />
    </>
  );
};

export default injectIntl(DoctorSchedule);
