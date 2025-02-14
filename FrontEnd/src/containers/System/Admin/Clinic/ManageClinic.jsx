import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Lightbox from "react-image-lightbox";
import { useCallback, useEffect, useState } from "react";
import { getBase64 } from "../../../../utils/CommonUtils";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../store/actions";
import { CRUD_ACTION, LANGUAGES } from "../../../../utils";
import { toast } from "react-toastify";
import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ManageClinic = () => {
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [previewImageURL, setPreviewImageURL] = useState("");
  const [nameVi, setNameVi] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [address, setAddress] = useState("");
  const [listClinic, setListClinic] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState({});
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [descriptionMarkdown, setDescriptionMarkdown] = useState("");

  const dispatch = useDispatch();

  const clinics = useSelector((state) => state.clinic.clinics);
  const language = useSelector((state) => state.app.language);

  const getClinic = useCallback(() => {
    let newClinic = clinics.map((item) => {
      return {
        value: item.id,
        label: language === LANGUAGES.VI ? item.nameVi : item.nameEn,
      };
    });
    setListClinic(newClinic);
  }, [clinics]);

  useEffect(() => {
    dispatch(actions.fetchAllClinicRedux());
  }, [language]);

  useEffect(() => {
    getClinic();
  }, [getClinic]);

  useEffect(() => {
    let findClinic = clinics.find((item) => item.id === selectedClinic.value);
    if (language === LANGUAGES.VI) setNameVi(findClinic?.nameVi);
    if (language === LANGUAGES.EN) setNameEn(findClinic?.nameEn);
    setImage(findClinic?.image);
    setDescriptionHTML(findClinic?.descriptionHTML);
    setDescriptionMarkdown(findClinic?.descriptionMarkdown);
    setPreviewImageURL(findClinic?.image);
    setAddress(findClinic?.address);
    return () => {
      setDescriptionMarkdown("");
      setDescriptionHTML("");
      setImage("");
      setPreviewImageURL("");
      setNameVi("");
      setNameEn("");
      setAddress("");
    };
  }, [selectedClinic]);

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

  const handleSaveNewClinic = () => {
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
      address,
      id: selectedClinic.value,
      action: isSelected ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
      image,
      descriptionMarkdown,
      descriptionHTML,
    };
    dispatch(actions.createNewClinicRedux(data));
    setDescriptionMarkdown("");
    setDescriptionHTML("");
    setImage("");
    setAddress("");
    setPreviewImageURL("");
    setNameVi("");
    setNameEn("");
  };

  const handleChange = (selectedClinic) => {
    setIsSelected(true);
    setSelectedClinic(selectedClinic);
  };

  const handleChangeName = (e) => {
    if (language === LANGUAGES.VI) setNameVi(e.target.value);
    else setNameEn(e.target.value);
  };

  return (
    <div className="manage-specialty-container">
      <div className="ms-title">
        <FormattedMessage id="manage-clinic.title" />
      </div>
      <div className="add-new-specialty row">
        <div className="col-6 form-group">
          <label>
            <FormattedMessage id="manage-clinic.specialty-name" />
          </label>
          <input
            value={language === LANGUAGES.VI ? nameVi : nameEn}
            onChange={(e) => handleChangeName(e)}
            className="form-control"
            type="text"
          />
          <div className="mt-3">
            <label>
              <FormattedMessage id="manage-clinic.select-specialty" />
            </label>
            <Select
              defaultValue={selectedClinic}
              onChange={handleChange}
              options={listClinic}
            />
          </div>
        </div>
        <div className="col-6 form-group">
          <label>
            <FormattedMessage id="manage-clinic.image" />
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
        <div className="col-6 form-group">
          <label>
            <FormattedMessage id="manage-clinic.address" />
          </label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            type="text"
          />
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
            onClick={() => handleSaveNewClinic()}
            className={
              !isSelected ? "btn-create-specialty" : "btn-save-specialty"
            }
          >
            {isSelected ? (
              <FormattedMessage id="manage-clinic.btn-save" />
            ) : (
              <FormattedMessage id="manage-clinic.btn-create" />
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

export default ManageClinic;
