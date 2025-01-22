import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [menuApp, setMenuApp] = useState([]);

  const dispatch = useDispatch();

  const language = useSelector((state) => state.app.language);
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleChangeLanguage = (language) => {
    dispatch(actions.changeLanguageApp(language));
  };

  const history = useHistory();

  useEffect(() => {
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo?.roleData.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      if (role === USER_ROLE.PATIENT) {
        history.push("/home");
      }
    }
    setMenuApp(menu);
  }, []);

  return (
    <div className="header-container">
      {/* thanh navigator */}
      <div className="header-tabs-container">
        <Navigator menus={menuApp} />
      </div>
      <div className="languages">
        <span className="welcome">
          <FormattedMessage id="home-header.welcome" />,{"\t"}
          {userInfo && userInfo.fullName ? userInfo.fullName : ""} !
        </span>
        <span
          className={
            language === LANGUAGES.VI ? "language-vi active" : "language-vi"
          }
          onClick={() => handleChangeLanguage(LANGUAGES.VI)}
        >
          VN
        </span>
        <span
          className={
            language === LANGUAGES.EN ? "language-en active" : "language-en"
          }
          onClick={() => handleChangeLanguage(LANGUAGES.EN)}
        >
          EN
        </span>
        {/* nút logout */}
        <div
          className="btn btn-logout"
          onClick={() => dispatch(actions.processLogout())}
          title="Log out"
        >
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
