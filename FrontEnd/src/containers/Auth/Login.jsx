import React, { useState } from "react";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
import { useDispatch } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIshowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogin = async () => {
    setErrMessage("");

    try {
      const data = await handleLoginApi(email, password);
      if (data && data.errCode !== 0) {
        //khi co loi login (email kh ton tai, sai password)
        setErrMessage(data.message);
      }
      if (data && data.errCode === 0) {
        //khi login thanh cong
        dispatch(actions.userLoginSuccess(data.user));
      }
    } catch (e) {
      if (e.response && e.response.data) {
        setErrMessage(e.response.data.message);
      }
      console.log(">>>check error response", e.response);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.ketCode === 13) handleLogin();
  };

  const handleClickForgotPassword = () => {
    history.push("/forgot-password");
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 text-login">
            <FormattedMessage id="auth.login.login" />
          </div>
          <div className="col-12 form-group">
            <label>Email:</label>
            <input
              value={email}
              type="text"
              placeholder={props.intl.formatMessage({
                id: "auth.login.placeholder-email",
              })}
              className="form-control"
              onKeyDown={(event) => handleKeyDown(event)}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="col-12 form-group password-input">
            <label>
              <FormattedMessage id="auth.login.password" />:
            </label>
            <div className="password-group">
              <input
                value={password}
                type={isShowPassword ? "text" : "password"}
                placeholder={props.intl.formatMessage({
                  id: "auth.login.placeholder-password",
                })}
                className="form-control"
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event)}
              />
              <span>
                <i
                  className={isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}
                  onClick={() => setIshowPassword(!isShowPassword)}
                ></i>
              </span>
            </div>
          </div>
          <div className="col-12" style={{ color: "red" }}>
            {errMessage}
          </div>
          <div className="col-12">
            <button className="btn-login" onClick={() => handleLogin()}>
              <FormattedMessage id="auth.login.login" />
            </button>
          </div>
          <div className="col-12 forgot-password">
            <span
              className="forgot-password"
              onClick={() => handleClickForgotPassword()}
            >
              <FormattedMessage id="auth.login.forgot" />
            </span>
          </div>
          <div className="col-12 text-center mt-3">
            <span className="text-other-login">
              <FormattedMessage id="auth.login.or-login-with" />:
            </span>
          </div>
          <div className="col-12 social-login">
            <i className="fab fa-google-plus-g google"></i>
            <i className="fab fa-facebook-f facebook"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(Login);
