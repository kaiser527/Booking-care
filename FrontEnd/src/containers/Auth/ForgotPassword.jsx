import { useHistory } from "react-router-dom";
import "./ForgotPassword.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { useState } from "react";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");

  const history = useHistory();

  const disptach = useDispatch();

  const language = useSelector((state) => state.app.language);

  return (
    <div className="forgot-password-container">
      <div className="card">
        <p className="lock-icon">
          <i className="fas fa-lock"></i>
        </p>
        <h2>
          <FormattedMessage id="auth.forgot-password.title" />
        </h2>
        <p>
          <FormattedMessage id="auth.forgot-password.description" />
        </p>
        <input
          type="text"
          className="passInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={props.intl.formatMessage({
            id: "auth.forgot-password.placeholder",
          })}
        />
        <button
          onClick={() =>
            disptach(actions.postForgotPasswordRedux({ email, language }))
          }
        >
          <FormattedMessage id="auth.forgot-password.send-password" />
        </button>
        <p className="return-login" onClick={() => history.push("/login")}>
          <FormattedMessage id="auth.forgot-password.return-login" />
        </p>
      </div>
    </div>
  );
};

export default injectIntl(ForgotPassword);
