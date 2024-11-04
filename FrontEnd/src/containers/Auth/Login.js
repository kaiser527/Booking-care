import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    }); //truoc khi click login thi clear tat ca cac ma loi da co tren man hinh

    try {
      const data = await handleLoginApi(this.state.email, this.state.password);
      if (data && data.errCode !== 0) {
        //khi co loi login (email kh ton tai, sai password)
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        //khi login thanh cong
        this.props.userLoginSuccess(data.user);
      }
    } catch (e) {
      if (e.response && e.response.data) {
        this.setState({
          errMessage: e.response.data.message,
        });
      }
      console.log(">>>check error response", e.response);
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group">
              <label>Email:</label>
              <input
                value={this.state.email}
                type="text"
                placeholder="Enter your username"
                className="form-control"
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
              />
            </div>
            <div className="col-12 form-group password-input">
              <label>Password:</label>
              <div className="password-group">
                <input
                  value={this.state.password}
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="form-control"
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
                <span>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                    onClick={() =>
                      this.setState({
                        isShowPassword: !this.state.isShowPassword,
                      })
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password ?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Login With:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
