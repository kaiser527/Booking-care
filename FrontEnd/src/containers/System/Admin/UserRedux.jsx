import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { LANGUAGES, CRUD_ACTION } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./UserRedux.scss";
import { useSelector } from "react-redux";
import TableManageUser from "./TableManageUser";
import { toast } from "react-toastify";
import { getBase64 } from "../../../utils/CommonUtils";

const UserRedux = () => {
  const [previewImageURL, setPreviewImageURL] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [listGender, setListGender] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [listPosition, setListPosition] = useState([]);
  const [action, setAction] = useState("");
  const [userEditId, setUserEditId] = useState("");

  const language = useSelector((state) => state.app.language);
  const genders = useSelector((state) => state.admin.genders);
  const positions = useSelector((state) => state.admin.positions);
  const roles = useSelector((state) => state.admin.roles);
  const users = useSelector((state) => state.admin.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchGenderStart());
    dispatch(actions.fetchRoleStart());
    dispatch(actions.fetchPositionStart());
  }, []);

  useEffect(() => {
    let arrGenders = genders;
    setListGender(arrGenders);
    setGender(arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "");
  }, [genders]);

  useEffect(() => {
    let arrRoles = roles;
    setListRole(arrRoles);
    setRole(arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "");
  }, [roles]);

  useEffect(() => {
    let arrPositions = positions;
    setListPosition(arrPositions);
    setPosition(
      arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ""
    );
  }, [positions]);

  useEffect(() => {
    let arrGenders = genders;
    let arrRoles = roles;
    let arrPositions = positions;

    setEmail("");
    setPassword("");
    setFullName("");
    setPhoneNumber("");
    setAddress("");
    setAvatar("");
    setPreviewImageURL("");
    setGender(arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "");
    setRole(arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "");
    setPosition(
      arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ""
    );
    setAction(CRUD_ACTION.CREATE);
  }, [users]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isNumeric = (num) => {
    return !isNaN(num);
  };

  const openPreviewImage = () => {
    if (!previewImageURL) return;
    setIsOpen(true);
  };

  const handleOnChangeImage = async (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let base64 = await getBase64(event.target.files[0]);
      setPreviewImageURL(URL.createObjectURL(event.target.files[0]));
      setAvatar(base64);
    }
  };

  const handleSaveUser = () => {
    if (!email || !password || !fullName || !address || !phoneNumber) {
      toast.error("Missing required paramenters!");
      return;
    }
    let check = validateEmail(email);
    if (!check) {
      toast.error("Invalid email!");
      return;
    }
    if (!isNumeric(phoneNumber)) {
      toast.error("Phone must be a number!");
      return;
    }

    if (action === CRUD_ACTION.CREATE) {
      let data = {
        email: email,
        password: password,
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        gender: gender,
        roleId: role,
        positionId: position,
        image: avatar,
      };
      dispatch(actions.createNewUserRedux(data));
    }
    if (action === CRUD_ACTION.EDIT) {
      let data = {
        id: userEditId,
        email: email,
        password: password,
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        gender: gender,
        roleId: role,
        positionId: position,
        image: avatar,
      };
      dispatch(actions.editUserRedux(data));
    }
  };

  const handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    setEmail(user.email);
    setPassword("HashPassword");
    setFullName(user.fullName);
    setPhoneNumber(user.phoneNumber);
    setAddress(user.address);
    setAvatar("");
    setPreviewImageURL(imageBase64);
    setGender(user.gender);
    setRole(user.roleId);
    setPosition(user.positionId);
    setAction(CRUD_ACTION.EDIT);
    setUserEditId(user.id);
  };

  return (
    <div className="user-redux-container">
      <div className="title">Manage User Redux</div>
      <div className="user-redux-body">
        <div className="container">
          <div className="row">
            <div className="col-12 my-3">
              <FormattedMessage id="manage-user.add" />
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.email" />
              </label>
              <input
                disabled={action === CRUD_ACTION.EDIT ? true : false}
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.password" />
              </label>
              <input
                disabled={action === CRUD_ACTION.EDIT ? true : false}
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-6">
              <label>
                <FormattedMessage id="manage-user.full-name" />
              </label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.phone-number" />
              </label>
              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <div className="col-9">
              <label>
                <FormattedMessage id="manage-user.address" />
              </label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.gender" />
              </label>
              <select
                className="form-control"
                onChange={(event) => setGender(event.target.value)}
                value={gender}
              >
                {listGender &&
                  listGender.length > 0 &&
                  listGender.map((gender, index) => {
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
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.position" />
              </label>
              <select
                className="form-control"
                onChange={(event) => setPosition(event.target.value)}
                value={position}
              >
                {listPosition &&
                  listPosition.length > 0 &&
                  listPosition.map((position, index) => {
                    return (
                      <option key={index} value={position.keyMap}>
                        {language === LANGUAGES.VI
                          ? position.valueVi
                          : position.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.role" />
              </label>
              <select
                className="form-control"
                onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                {listRole &&
                  listRole.length > 0 &&
                  listRole.map((role, index) => {
                    return (
                      <option key={index} value={role.keyMap}>
                        {language === LANGUAGES.VI
                          ? role.valueVi
                          : role.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.image" />
              </label>
              <div className="preview-img-container">
                <input
                  id="previewImg"
                  type="file"
                  hidden
                  onChange={(event) => handleOnChangeImage(event)}
                />
                <label className="label-upload" htmlFor="previewImg">
                  <FormattedMessage id="manage-user.upload" />{" "}
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
            </div>
            <div className="col-12 mt-3">
              <button
                className={
                  action === CRUD_ACTION.EDIT
                    ? "btn btn-warning"
                    : "btn btn-primary"
                }
                onClick={() => handleSaveUser()}
              >
                {action === CRUD_ACTION.EDIT ? (
                  <FormattedMessage id="manage-user.edit" />
                ) : (
                  <FormattedMessage id="manage-user.save" />
                )}
              </button>
            </div>
            <div className="col-12 mt-4 mb-5">
              <TableManageUser
                handleEditUserFromParent={handleEditUserFromParent}
                action={action}
              />
            </div>
          </div>
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

export default UserRedux;
