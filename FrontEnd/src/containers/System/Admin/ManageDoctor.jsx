import React, { useEffect, useState } from "react";
import "./ManageDoctor.scss";
import { useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTION, LANGUAGES } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ManageDoctor = (props) => {
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [description, setDescription] = useState("");
  const [listDoctor, setListDoctor] = useState([]);
  const [hasOldData, setHasOldData] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [listPrice, setListPrice] = useState([]);
  const [listPayment, setListPayment] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [note, setNote] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [selectedPrice, setSelectedPrice] = useState({});
  const [selectedPayment, setSelectedPayment] = useState({});
  const [selectedProvince, setSelectedProvince] = useState({});

  const dispatch = useDispatch();

  const doctors = useSelector((state) => state.doctor.alldoctors);
  const doctorMarkdown = useSelector((state) => state.doctor.doctorMarkdown);
  const infoData = useSelector((state) => state.admin.infoData);
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    dispatch(actions.fetchAllDoctor());
  }, []);

  useEffect(() => {
    dispatch(actions.fetchRequiredDoctorInfo());
  }, [language]);

  useEffect(() => {
    let dataSelectPrice = buildInputSelect(infoData.resPrice, "DOCTOR_INFO");
    let dataSelectProvince = buildInputSelect(
      infoData.resProvince,
      "DOCTOR_INFO"
    );
    let dataSelectPayment = buildInputSelect(
      infoData.resPayment,
      "DOCTOR_INFO"
    );
    let dataSelectDoctor = buildInputSelect(doctors, "DOCTOR");
    setListDoctor(doctors && doctors.length > 0 ? dataSelectDoctor : []);
    setListPrice(
      infoData && infoData.resPrice && infoData.resPrice.length > 0
        ? dataSelectPrice
        : []
    );
    setListProvince(
      infoData && infoData.resProvince && infoData.resProvince.length > 0
        ? dataSelectProvince
        : []
    );
    setListPayment(
      infoData && infoData.resPayment && infoData.resPayment.length > 0
        ? dataSelectPayment
        : []
    );
  }, [infoData]);

  useEffect(() => {
    if (doctorMarkdown) {
      setContentMarkdown(doctorMarkdown.contentMarkdown);
      setContentHTML(doctorMarkdown.contentHTML);
      setDescription(doctorMarkdown.description);
    }
    if (doctorMarkdown.infoDataMarkdown) {
      setClinicAddress(doctorMarkdown.infoDataMarkdown.addressClinic);
      setClinicName(doctorMarkdown.infoDataMarkdown.nameClinic);
      setNote(doctorMarkdown.infoDataMarkdown.note);
      let selectedPayment = listPayment.find(
        (item) => item.value === doctorMarkdown.infoDataMarkdown.paymentId
      );
      let selectedPrice = listPrice.find(
        (item) => item.value === doctorMarkdown.infoDataMarkdown.priceId
      );
      let selectedProvince = listProvince.find(
        (item) => item.value === doctorMarkdown.infoDataMarkdown.provinceId
      );
      if (selectedPayment && selectedPrice && selectedProvince) {
        setSelectedPrice(selectedPrice);
        setSelectedPayment(selectedPayment);
        setSelectedProvince(selectedProvince);
      }
    }
    return () => {
      setSelectedPrice({});
      setSelectedPayment({});
      setSelectedProvince({});
      setContentMarkdown("");
      setContentHTML("");
      setDescription("");
      setClinicAddress("");
      setClinicName("");
      setNote("");
    };
  }, [doctorMarkdown]);

  const handleEditorChange = ({ html, text }) => {
    setContentHTML(html);
    setContentMarkdown(text);
  };

  const handleSaveContentMarkdown = () => {
    dispatch(
      actions.saveDetailDoctorRedux({
        contentHTML: contentHTML,
        contentMarkdown: contentMarkdown,
        description: description,
        doctorId: selectedDoctor.value,
        action: hasOldData ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
        selectedPrice: selectedPrice.value,
        selectedPayment: selectedPayment.value,
        selectedProvince: selectedProvince.value,
        clinicName: clinicName,
        clinicAddress: clinicAddress,
        note: note,
      })
    );
  };

  const buildInputSelect = (data, type) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        if (type === "DOCTOR") {
          object.label = item.fullName;
          object.value = item.id;
        }
        if (type === "DOCTOR_INFO") {
          object.label =
            language === LANGUAGES.VI ? item.valueVi : item.valueEn;
          object.value = item.keyMap;
        }
        result.push(object);
      });
    }
    return result;
  };

  const handleChange = (selectedDoctor) => {
    setSelectedDoctor(selectedDoctor);
    dispatch(actions.getDoctorMarkdownRedux(selectedDoctor.value));
    if (doctorMarkdown) {
      setIsSelected(true);
      setHasOldData(true);
    } else {
      setHasOldData(false);
    }
  };

  const handleChangeSelectDoctorInfo = async (selectedOption, objName) => {
    let stateName = objName.name;
    let state = {
      selectedPrice: selectedPrice,
      selectedPayment: selectedPayment,
      selectedProvince: selectedProvince,
    };
    state[stateName] = selectedOption;
    setSelectedPrice(state.selectedPrice);
    setSelectedPayment(state.selectedPayment);
    setSelectedProvince(state.selectedProvince);
  };

  return (
    <div className="manage-doctor-container">
      <div className="manage-doctor-title">
        <FormattedMessage id="manage-doctor.add-info" />
      </div>
      <div className="more-info">
        <div className="content-left form-group">
          <label>
            <FormattedMessage id="manage-doctor.select-doctor" />
          </label>
          <Select
            value={isSelected ? selectedDoctor : ""}
            onChange={handleChange}
            options={listDoctor}
            placeholder={props.intl.formatMessage({
              id: "manage-doctor.placeholder",
            })}
          />
        </div>
        <div className="content-right">
          <label>
            <FormattedMessage id="manage-doctor.description" />:
          </label>
          <textarea
            className="form-control"
            value={isSelected ? description : ""}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="more-info-extra row">
        <div className="col-4 form-group">
          <label>
            <FormattedMessage id="manage-doctor.price" />
          </label>
          <Select
            value={isSelected ? selectedPrice : ""}
            onChange={handleChangeSelectDoctorInfo}
            options={listPrice}
            placeholder={props.intl.formatMessage({
              id: "manage-doctor.info-placeholder.price",
            })}
            name="selectedPrice"
          />
        </div>
        <div className="col-4 form-group">
          <label>
            <FormattedMessage id="manage-doctor.payment" />
          </label>
          <Select
            value={isSelected ? selectedPayment : ""}
            onChange={handleChangeSelectDoctorInfo}
            options={listPayment}
            placeholder={props.intl.formatMessage({
              id: "manage-doctor.info-placeholder.payment-method",
            })}
            name="selectedPayment"
          />
        </div>
        <div className="col-4 form-group">
          <label>
            <FormattedMessage id="manage-doctor.province" />
          </label>
          <Select
            value={isSelected ? selectedProvince : ""}
            onChange={handleChangeSelectDoctorInfo}
            options={listProvince}
            placeholder={props.intl.formatMessage({
              id: "manage-doctor.info-placeholder.province",
            })}
            name="selectedProvince"
          />
        </div>
        <div className="col-4 form-group">
          <label>
            <FormattedMessage id="manage-doctor.clinic-name" />
          </label>
          <input
            value={isSelected ? clinicName : ""}
            onChange={(event) => setClinicName(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-4 form-group">
          <label>
            <FormattedMessage id="manage-doctor.clinic-address" />
          </label>
          <input
            value={isSelected ? clinicAddress : ""}
            onChange={(event) => setClinicAddress(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-4 form-group">
          <label>
            <FormattedMessage id="manage-doctor.note" />
          </label>
          <input
            value={isSelected ? note : ""}
            onChange={(event) => setNote(event.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <div className="manage-doctor-editor">
        <MdEditor
          value={isSelected ? contentMarkdown : ""}
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>
      <button
        className={hasOldData ? "save-content-doctor" : "create-content-doctor"}
        onClick={() => handleSaveContentMarkdown()}
      >
        {hasOldData ? (
          <FormattedMessage id="manage-doctor.save-info" />
        ) : (
          <FormattedMessage id="manage-doctor.create-info" />
        )}
      </button>
    </div>
  );
};

export default injectIntl(ManageDoctor);
