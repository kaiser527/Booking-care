import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManageSchedule.scss";
import { LANGUAGES, USER_ROLE } from "../../../utils";
import _ from "lodash";
import { toast } from "react-toastify";

const ManageSchedule = (props) => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [listDoctor, setListDoctor] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rangeTime, setRangeTime] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  const scheduleTimes = useSelector((state) => state.doctor.scheduleTimes);
  const doctors = useSelector((state) => state.doctor.alldoctors);
  const language = useSelector((state) => state.app.language);
  const userInfo = useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();

  const getAllScheduleTimeAndDoctor = useCallback(() => {
    if (userInfo?.roleId === USER_ROLE.ADMIN) {
      dispatch(actions.fetchAllDoctor());
    }
    dispatch(actions.fetchAllScheduleTimesRedux());
  }, [scheduleTimes, doctors]);

  useEffect(() => {
    getAllScheduleTimeAndDoctor();
  }, []);

  useEffect(() => {
    let dataSelect = buildInputSelect(doctors);
    setListDoctor(dataSelect);
    if (scheduleTimes && scheduleTimes.length > 0) {
      scheduleTimes.map((time) => {
        time.isSelected = false;
      });
      setRangeTime(scheduleTimes);
    }
  }, [getAllScheduleTimeAndDoctor]);

  const buildInputSelect = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        object.label = item.fullName;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  const handleChange = (selectedDoctor) => {
    setIsSelected(true);
    setSelectedDoctor(selectedDoctor);
  };

  const handleOnChangeDatePicker = (date) => {
    setCurrentDate(date[0]);
  };

  const handleClickBtnTime = (time) => {
    let rangeTimeCopy = _.cloneDeep(rangeTime);
    if (rangeTime && rangeTime.length > 0) {
      let index = rangeTimeCopy.findIndex((item) => item.id === time.id);
      if (index > -1) {
        rangeTimeCopy[index].isSelected = !rangeTimeCopy[index].isSelected;
      }
    }
    setRangeTime(rangeTimeCopy);
  };

  const handleSaveSchedule = () => {
    let formattedDate = new Date(currentDate).getTime();
    let result = [];
    let check = userInfo?.roleId === USER_ROLE.DOCTOR;
    if (!currentDate) {
      toast.error("Invalid date");
      return;
    }
    if (userInfo?.roleId === USER_ROLE.ADMIN) {
      if (selectedDoctor && _.isEmpty(selectedDoctor)) {
        toast.error("Invalid doctor");
        return;
      }
    }
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let object = {};
          object.doctorId = check ? userInfo.id : selectedDoctor.value;
          object.date = formattedDate;
          object.timeType = time.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time");
        return;
      }
    }
    dispatch(
      actions.bulkCreateDoctorRedux({
        arrSchedule: result,
        doctorId: check ? userInfo.id : selectedDoctor.value,
        date: formattedDate,
      })
    );
  };

  return (
    <div className="manage-schedule-container">
      <div className="m-s-title">
        <FormattedMessage id="manage-schedule.title" />
      </div>
      <div className="container">
        <div className="row">
          {userInfo?.roleId === USER_ROLE.ADMIN && (
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                defaultValue={isSelected ? selectedDoctor : ""}
                onChange={handleChange}
                options={listDoctor}
                placeholder={props.intl.formatMessage({
                  id: "manage-doctor.placeholder",
                })}
              />
            </div>
          )}
          <div className="col-6">
            <label>
              <FormattedMessage id="manage-schedule.choose-date" />
            </label>
            <DatePicker
              className="form-control"
              onChange={handleOnChangeDatePicker}
              value={currentDate}
              minDate={yesterday}
              placeholder={props.intl.formatMessage({
                id: "manage-schedule.placeholder",
              })}
            />
          </div>
          <div className="col-12 pick-hour-container">
            {rangeTime &&
              rangeTime.length > 0 &&
              rangeTime.map((time, index) => {
                return (
                  <button
                    className={
                      time.isSelected === true
                        ? "btn btn-schedule active"
                        : "btn btn-schedule"
                    }
                    key={`schedule-time-${index}`}
                    onClick={() => handleClickBtnTime(time)}
                  >
                    {language === LANGUAGES.VI ? time.valueVi : time.valueEn}
                  </button>
                );
              })}
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary btn-save-schedule"
              onClick={() => handleSaveSchedule()}
            >
              <FormattedMessage id="manage-schedule.save-info" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ManageSchedule);
