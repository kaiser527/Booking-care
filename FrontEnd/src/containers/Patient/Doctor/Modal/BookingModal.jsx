import { useEffect, useState } from "react";
import ProfileDoctor from "../ProfileDoctor";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import * as actions from "../../../../store/actions";
import { FormattedMessage, injectIntl } from "react-intl";
import DatePicker from "../../../../components/Input/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { dateFormat, LANGUAGES } from "../../../../utils";
import moment from "moment";
import { toast } from "react-toastify";
import { useHistory, useLocation, useParams } from "react-router-dom";
import _ from "lodash";

const BookingModal = (props) => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  const {
    setIsShowModalBooking,
    doctorIdFromParent,
    isShowModalBooking,
    dataScheduleTimeModal,
  } = props;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const language = useSelector((state) => state.app.language);
  const genders = useSelector((state) => state.user.genders);

  const dispatch = useDispatch();

  const params = useParams();

  const history = useHistory();

  const location = useLocation();

  let pathName = location.pathname.split("/")[1];

  useEffect(() => {
    dispatch(actions.fetchGenderPatient());
  }, []);

  const handleOnChangeDatePicker = (date) => {
    setDate(date[0]);
  };

  const checkValidInput = (inputState) => {
    let isValid = true;
    let arrInput = [
      "fullName",
      "phoneNumber",
      "email",
      "address",
      "date",
      "reason",
      "gender",
      "doctorId",
      "timeType",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!inputState[arrInput[i]]) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const buildTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let date =
        language === LANGUAGES.VI
          ? capitalizeFirstLetter(
              moment(dataTime.date).format("dddd - DD/MM/YYYY")
            )
          : moment(dataTime.date).locale("en").format("ddd - MM/DD/YYYY");
      return `${
        language === LANGUAGES.VI
          ? dataTime.scheduleData.valueVi
          : dataTime.scheduleData.valueEn
      } - ${date}`;
    }
  };

  const handleConfirmBooking = () => {
    if (!isLoggedIn) {
      history.push("/login");
      toast.error(
        props.intl.formatMessage({
          id: "patient.booking-modal.alert-login",
        })
      );
    } else {
      let timeString = buildTimeBooking(dataScheduleTimeModal);
      let formattedBirthDate = moment(date).format(dateFormat.SEND_TO_SERVER);
      let data = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        date: formattedBirthDate,
        reason: reason,
        gender: gender,
        doctorId: pathName === "detail-doctor" ? params.id : doctorIdFromParent,
        timeType: dataScheduleTimeModal.timeType,
        language: language,
        timeString: timeString,
        doctorName: dataScheduleTimeModal.scheduleUserData.fullName,
      };
      if (checkValidInput(data) === true) {
        dispatch(actions.postBookingAppointmentRedux(data));
        setIsShowModalBooking(false);
        setFullName("");
        setPhoneNumber("");
        setAddress("");
        setEmail("");
        setReason("");
        setDate("");
        setGender(genders[0]);
      } else {
        toast.error(
          props.intl.formatMessage({
            id: "patient.booking-modal.alert",
          })
        );
      }
    }
  };

  return (
    <div>
      <Modal
        centered
        size="lg"
        isOpen={isShowModalBooking}
        className="booking-modal-container"
        backdrop={true}
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
            <span
              className="right"
              onClick={() => setIsShowModalBooking(false)}
            >
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="doctor-infor">
              <ProfileDoctor
                dataScheduleTimeModal={dataScheduleTimeModal}
                isShowDescDoctor={false}
                isShowPrice={true}
                doctorIdFromParent={doctorIdFromParent}
              />
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.full-name" />
                </label>
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.phone-number" />
                </label>
                <input
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.contact" />
                </label>
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.date" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={handleOnChangeDatePicker}
                  value={date}
                  placeholder={props.intl.formatMessage({
                    id: "manage-schedule.placeholder",
                  })}
                  minDate={yesterday}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => setGender(event.target.value)}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((gender, index) => {
                      return (
                        <option key={index} value={gender.keyMap}>
                          {language === LANGUAGES.VI
                            ? gender.valueVi
                            : gender.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              onClick={() => handleConfirmBooking()}
            >
              <FormattedMessage id="patient.booking-modal.confirm" />
            </button>
            <button
              className="btn-booking-cancel"
              onClick={() => setIsShowModalBooking(false)}
            >
              <FormattedMessage id="patient.booking-modal.cancel" />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default injectIntl(BookingModal);
