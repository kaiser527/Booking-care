import { useLocation, useHistory } from "react-router-dom";
import "./ResetPassword.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const ResetPassword = () => {
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
    dispatch(
      actions.verifyResetPasswordRedux({
        token: token,
        email: email,
        newPassword: confirmPassword,
      })
    );
    history.push("/login");
  };

  return (
    <div className="reset-password-backgound">
      <div className="reset-password-container">
        <div className="reset-password-content row">
          <div className="col-12 reset-title">Reset your password</div>
          <form className="form-reset-password col-12">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your new Password"
              />
              <small className="form-text text-muted">
                Enter your new password here.
              </small>
            </div>
            <div className="form-group">
              <label>Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                placeholder="Confirm your new Password"
              />
              <small className="form-text text-muted">
                Confirm your new password.
              </small>
            </div>
            {isShowErrorMessage && (
              <p style={{ color: "red" }}>Password is not same</p>
            )}
            <button
              onClick={() => handleSubmitResetPassword()}
              type="submit"
              className="btn btn-primary"
              disabled={isShowErrorMessage}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
