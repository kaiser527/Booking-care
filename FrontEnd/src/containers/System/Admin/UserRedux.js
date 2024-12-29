import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./UserRedux.scss";
import { useSelector } from "react-redux";

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

  const language = useSelector((state) => state.app.language);
  const genders = useSelector((state) => state.admin.genders);
  const positions = useSelector((state) => state.admin.positions);
  const roles = useSelector((state) => state.admin.roles);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchGenderStart());
    dispatch(actions.fetchRoleStart());
    dispatch(actions.fetchPositionStart());
  }, []);

  useEffect(() => {
    let arrGenders = genders;
    setListGender(arrGenders);
    setGender(arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "");
  }, [genders]);

  useEffect(() => {
    let arrRoles = roles;
    setListRole(arrRoles);
    setRole(arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "");
  }, [roles]);

  useEffect(() => {
    let arrPositions = positions;
    setListPosition(arrPositions);
    setPosition(
      arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ""
    );
  }, [positions]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const openPreviewImage = () => {
    if (!previewImageURL) return;
    setIsOpen(true);
  };

  const handleOnChangeImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImageURL(URL.createObjectURL(event.target.files[0]));
      setAvatar(event.target.files[0]);
    }
  };

  const handleSaveUser = () => {
    if (!email || !password || !fullName || !address || !phoneNumber) {
      alert("Missing required paramenter");
      return;
    }
    let check = validateEmail(email);
    if (!check) {
      alert("Invalid email");
    }
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
              >
                {listGender &&
                  listGender.length > 0 &&
                  listGender.map((gender, index) => {
                    return (
                      <option key={index} value={gender.key}>
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
              >
                {listPosition &&
                  listPosition.length > 0 &&
                  listPosition.map((position, index) => {
                    return (
                      <option key={index} value={position.key}>
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
              >
                {listRole &&
                  listRole.length > 0 &&
                  listRole.map((role, index) => {
                    return (
                      <option key={index} value={role.key}>
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
                  Tải ảnh <i className="fas fa-upload" />
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
                className="btn btn-primary"
                onClick={() => handleSaveUser()}
              >
                <FormattedMessage id="manage-user.save" />
              </button>
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
