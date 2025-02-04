import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Lightbox from "react-image-lightbox";
import { useCallback, useEffect, useState } from "react";
import { getBase64 } from "../../../utils/CommonUtils";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { CRUD_ACTION, LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ManageSpecialty = () => {
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [previewImageURL, setPreviewImageURL] = useState("");
  const [nameVi, setNameVi] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [listSpecialty, setListSpecialty] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState({});
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [descriptionMarkdown, setDescriptionMarkdown] = useState("");

  const dispatch = useDispatch();

  const specialties = useSelector((state) => state.specialty.specialties);
  const language = useSelector((state) => state.app.language);

  const getSpecialty = useCallback(() => {
    let newSpecialty = specialties.map((item) => {
      return {
        value: item.id,
        label: language === LANGUAGES.VI ? item.nameVi : item.nameEn,
      };
    });
    setListSpecialty(newSpecialty);
  }, [specialties]);

  useEffect(() => {
    dispatch(actions.fetchAllSpecialtyRedux());
  }, [language]);

  useEffect(() => {
    getSpecialty();
  }, [getSpecialty]);

  useEffect(() => {
    let findSpecialty = specialties.find(
      (item) => item.id === selectedSpecialty.value
    );
    if (language === LANGUAGES.VI) setNameVi(findSpecialty?.nameVi);
    if (language === LANGUAGES.EN) setNameEn(findSpecialty?.nameEn);
    setImage(findSpecialty?.image);
    setDescriptionHTML(findSpecialty?.descriptionHTML);
    setDescriptionMarkdown(findSpecialty?.descriptionMarkdown);
    setPreviewImageURL(findSpecialty?.image);
    return () => {
      setDescriptionMarkdown("");
      setDescriptionHTML("");
      setImage("");
      setPreviewImageURL("");
      setNameVi("");
      setNameEn("");
    };
  }, [selectedSpecialty]);

  const handleOnChangeImage = async (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let base64 = await getBase64(event.target.files[0]);
      setPreviewImageURL(URL.createObjectURL(event.target.files[0]));
      setImage(base64);
    }
  };

  const openPreviewImage = () => {
    if (!previewImageURL) return;
    setIsOpen(true);
  };

  const handleEditorChange = ({ html, text }) => {
    setDescriptionHTML(html);
    setDescriptionMarkdown(text);
  };

  const handleSaveNewSpecilaty = () => {
    if (language === LANGUAGES.VI && !nameVi) {
      toast.error("Missing required paramenter");
      return;
    }
    if (language === LANGUAGES.EN && !nameEn) {
      toast.error("Missing required paramenter");
      return;
    }
    let data = {
      nameVi,
      nameEn,
      language,
      id: selectedSpecialty.value,
      action: isSelected ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
      image,
      descriptionMarkdown,
      descriptionHTML,
    };
    dispatch(actions.createNewSpecialtyRedux(data));
    setDescriptionMarkdown("");
    setDescriptionHTML("");
    setImage("");
    setPreviewImageURL("");
    setNameVi("");
    setNameEn("");
  };

  const handleChange = (selectedSpecialty) => {
    setIsSelected(true);
    setSelectedSpecialty(selectedSpecialty);
  };

  const handleChangeName = (e) => {
    if (language === LANGUAGES.VI) setNameVi(e.target.value);
    else setNameEn(e.target.value);
  };

  return (
    <div className="manage-specialty-container">
      <div className="ms-title">
        <FormattedMessage id="manage-specialty.title" />
      </div>
      <div className="add-new-specialty row">
        <div className="col-6 form-group">
          <label>
            <FormattedMessage id="manage-specialty.specialty-name" />
          </label>
          <input
            value={language === LANGUAGES.VI ? nameVi : nameEn}
            onChange={(e) => handleChangeName(e)}
            className="form-control"
            type="text"
          />
          <div className="mt-3">
            <label>
              <FormattedMessage id="manage-specialty.select-specialty" />
            </label>
            <Select
              defaultValue={selectedSpecialty}
              onChange={handleChange}
              options={listSpecialty}
            />
          </div>
        </div>
        <div className="col-6 form-group">
          <label>
            <FormattedMessage id="manage-specialty.image" />
          </label>
          <input
            id="previewImg"
            hidden
            onChange={(event) => handleOnChangeImage(event)}
            type="file"
          />
          <br />
          <label className="label-upload" htmlFor="previewImg">
            <FormattedMessage id="manage-user.upload" />
            <i className="fas fa-upload" />
          </label>
          <div
            className="preview-img"
            style={{
              backgroundImage: `url(${previewImageURL})`,
            }}
            onClick={() => openPreviewImage()}
          ></div>
        </div>
        <div className="col-12">
          <MdEditor
            value={descriptionMarkdown}
            style={{ height: "333px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
        <div className="col-12">
          <button
            onClick={() => handleSaveNewSpecilaty()}
            className={
              !isSelected ? "btn-create-specialty" : "btn-save-specialty"
            }
          >
            {isSelected ? (
              <FormattedMessage id="manage-specialty.btn-save" />
            ) : (
              <FormattedMessage id="manage-specialty.btn-create" />
            )}
          </button>
        </div>
      </div>
      {isOpen === true && (
        <Lightbox
          mainSrc={previewImageURL}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ManageSpecialty;
