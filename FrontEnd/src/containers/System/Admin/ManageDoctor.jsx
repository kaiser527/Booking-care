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

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ManageDoctor = (props) => {
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [description, setDescription] = useState("");
  const [listDoctor, setListDoctor] = useState([]);

  const dispatch = useDispatch();

  const doctors = useSelector((state) => state.admin.alldoctors);

  useEffect(() => {
    dispatch(actions.fetchAllDoctor());
  }, []);

  useEffect(() => {
    let dataSelect = buildInputSelect(doctors);
    setListDoctor(dataSelect);
  }, [doctors]);

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

  return (
    <div className="manage-doctor-container">
      <div className="manage-doctor-title">Add more Information for Doctor</div>
      <div className="more-info">
        <div className="content-left form-group">
          <label>Select Doctor:</label>
          <Select
            defaultValue={selectedDoctor}
            onChange={setSelectedDoctor}
            options={listDoctor}
          />
        </div>
        <div className="content-right">
          <label>Description:</label>
          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="manage-doctor-editor">
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>
      <button
        className="save-content-doctor"
        onClick={() => handleSaveContentMarkdown()}
      >
        Save info
      </button>
    </div>
  );
};

export default ManageDoctor;
