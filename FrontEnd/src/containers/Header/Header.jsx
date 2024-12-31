import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";

const Header = () => {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.app.language);
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleChangeLanguage = (language) => {
    dispatch(actions.changeLanguageApp(language));
  };

  return (
    <div className="header-container">
      {/* thanh navigator */}
      <div className="header-tabs-container">
        <Navigator menus={adminMenu} />
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
