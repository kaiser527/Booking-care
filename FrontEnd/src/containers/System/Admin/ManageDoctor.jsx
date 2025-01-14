import React, { useEffect, useState } from "react";
import "./ManageDoctor.scss";
import { useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTION } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ManageDoctor = () => {
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [description, setDescription] = useState("");
  const [listDoctor, setListDoctor] = useState([]);
  const [hasOldData, setHasOldData] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const dispatch = useDispatch();

  const doctors = useSelector((state) => state.doctor.alldoctors);
  const doctorMarkdown = useSelector((state) => state.doctor.doctorMarkdown);

  useEffect(() => {
    dispatch(actions.fetchAllDoctor());
  }, []);

  useEffect(() => {
    let dataSelect = buildInputSelect(doctors);
    setListDoctor(dataSelect);
  }, [doctors]);

  useEffect(() => {
    setContentMarkdown(doctorMarkdown.contentMarkdown);
    setContentHTML(doctorMarkdown.contentHTML);
    setDescription(doctorMarkdown.description);
  }, [doctorMarkdown]);

  const handleEditorChange = ({ html, text }) => {
    setContentHTML(html);
    setContentMarkdown(text);
    console.log("handleEditorChange", contentMarkdown, contentHTML);
  };

  const handleSaveContentMarkdown = () => {
    dispatch(
      actions.saveDetailDoctorRedux({
        contentHTML: contentHTML,
        contentMarkdown: contentMarkdown,
        description: description,
        doctorId: selectedDoctor.value,
        action: hasOldData ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
      })
    );
  };

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
    dispatch(actions.getDoctorMarkdownRedux(selectedDoctor.value));
    if (doctorMarkdown) {
      setHasOldData(true);
    } else {
      setContentMarkdown("");
      setContentHTML("");
      setDescription("");
      setHasOldData(false);
    }
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
            defaultValue={selectedDoctor}
            onChange={handleChange}
            options={listDoctor}
          />
        </div>
        <div className="content-right">
          <label>
            <FormattedMessage id="manage-doctor.description" />
          </label>
          <textarea
            className="form-control"
            rows="4"
            value={isSelected ? description : ""}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
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

export default ManageDoctor;
