import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManageSchedule.scss";
import { dateFormat, LANGUAGES, USER_ROLE } from "../../../utils";
import _ from "lodash";
import moment from "moment";
import { toast } from "react-toastify";

const ManageSchedule = () => {
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [listDoctor, setListDoctor] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [rangeTime, setRangeTime] = useState([]);

  const scheduleTimes = useSelector((state) => state.doctor.scheduleTimes);
  const doctors = useSelector((state) => state.doctor.alldoctors);
  const language = useSelector((state) => state.app.language);
  const userInfo = useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      dispatch(actions.fetchAllDoctor());
    }
    dispatch(actions.fetchAllScheduleTimesRedux());
  }, []);

  useEffect(() => {
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      let dataSelect = buildInputSelect(doctors);
      setListDoctor(dataSelect);
    }
  }, [doctors]);

  useEffect(() => {
    if (scheduleTimes && scheduleTimes.length > 0) {
      scheduleTimes.map((time) => {
        time.isSelected = false;
      });
    }
    setRangeTime(scheduleTimes);
  }, [scheduleTimes]);

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
    setSelectedDoctor(selectedDoctor);
    console.log(selectedDoctor);
  };

  const handleOnChangeDatePicker = (date) => {
    setCurrentDate(date[0]);
  };

  const handleClickBtnTime = (time) => {
    let rangeTimeCopy = _.cloneDeep(rangeTime);
    if (rangeTime && rangeTime.length > 0) {
      let foundTime = rangeTimeCopy.findIndex((item) => item.id === time.id);
      if (foundTime > -1) {
        rangeTimeCopy[foundTime].isSelected =
          !rangeTimeCopy[foundTime].isSelected;
      }
    }
    setRangeTime(rangeTimeCopy);
  };

  const handleSaveSchedule = () => {
    let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let result = [];
    if (!currentDate) {
      toast.error("Invalid date");
      return;
    }
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      if (selectedDoctor && _.isEmpty(selectedDoctor)) {
        toast.error("Invalid doctor");
        return;
      }
    }
    if (rangeTime && rangeTime.length > 0) {
      let check = userInfo.roleId === USER_ROLE.DOCTOR;
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let object = {};
          object.doctorId = check ? userInfo.id : selectedDoctor.value;
          object.date = formattedDate;
          object.time = time.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time");
        return;
      }
    }
    console.log(result);
  };

  return (
    <div className="manage-schedule-container">
      <div className="m-s-title">
        <FormattedMessage id="manage-schedule.title" />
      </div>
      <div className="container">
        <div className="row">
          {userInfo.roleId === USER_ROLE.ADMIN && (
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                defaultValue={selectedDoctor}
                onChange={handleChange}
                options={listDoctor}
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
              value={currentDate[0]}
              minDate={new Date()}
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

export default ManageSchedule;
