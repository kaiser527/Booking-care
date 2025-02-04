import { useLocation, useHistory } from "react-router-dom";
import "./ResetPassword.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { FormattedMessage, injectIntl } from "react-intl";
import { toast } from "react-toastify";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  const location = useLocation();

  const dispatch = useDispatch();

  const history = useHistory();

  const token = location.search?.split("?token=")[1]?.split("&")[0];

  const email = location.search?.split("&email=")[1];

  useEffect(() => {
    setIsShowErrorMessage(
      password.length > 0 &&
        confirmPassword.length > 0 &&
        password !== confirmPassword
    );
  }, [password, confirmPassword]);

  const handleSubmitResetPassword = () => {
    if (!password || !confirmPassword) {
      toast.error(
        props.intl.formatMessage({
          id: "auth.reset-password.missing-password",
        })
      );
    } else {
      dispatch(
        actions.verifyResetPasswordRedux({
          token: token,
          email: email,
          newPassword: confirmPassword,
        })
      );
      history.push("/login");
    }
  };

  return (
    <div className="reset-password-backgound">
      <div className="reset-password-container">
        <div className="reset-password-content row">
          <div className="col-12 reset-title">
            <FormattedMessage id="auth.reset-password.title" />
          </div>
          <form className="form-reset-password col-12">
            <div className="form-group">
              <label>
                <FormattedMessage id="auth.reset-password.label-password" />
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder={props.intl.formatMessage({
                  id: "auth.reset-password.placeholder-password",
                })}
              />
              <small className="form-text text-muted">
                <FormattedMessage id="auth.reset-password.small-password" />
              </small>
            </div>
            <div className="form-group">
              <label>
                <FormattedMessage id="auth.reset-password.title" />
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                placeholder={props.intl.formatMessage({
                  id: "auth.reset-password.placeholder-confirm-password",
                })}
              />
              <small className="form-text text-muted">
                <FormattedMessage id="auth.reset-password.small-confirm-password" />
              </small>
            </div>
            {isShowErrorMessage && (
              <p style={{ color: "red" }}>
                <FormattedMessage id="auth.reset-password.error-message" />
              </p>
            )}
            <button
              onClick={() => handleSubmitResetPassword()}
              type="submit"
              className="btn btn-primary"
              disabled={isShowErrorMessage}
            >
              <FormattedMessage id="auth.reset-password.button" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ResetPassword);
