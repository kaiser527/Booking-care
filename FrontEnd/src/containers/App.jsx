import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import Doctor from "../routes/Doctor";
import { getPastDoctorScheduleAPI } from "../services/doctorService";
import { useDispatch } from "react-redux";
import { history } from "../redux";
import * as actions from "../store/actions";
import VerifyEmail from "./Patient/VerifyEmail";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";

const App = (props) => {
  const { persistor } = props;

  const [bootstrapped, setBootstrapped] = useState(persistor.getState());
  const [pastScheduleArr, setPastScheduleArr] = useState([]);

  const dispatch = useDispatch();

  const handlePersistorState = () => {
    if (bootstrapped) {
      if (props.onBeforeLift) {
        Promise.resolve(props.onBeforeLift())
          .then(() => setBootstrapped(true))
          .catch(() => setBootstrapped(true));
      } else {
        setBootstrapped(true);
      }
    }
  };

  useEffect(() => {
    handlePersistorState();
    getPastDoctorSchedule();
    return () => {
      setPastScheduleArr([]);
    };
  }, []);

  useEffect(() => {
    if (pastScheduleArr && pastScheduleArr.length > 0) {
      let pastSchedule = pastScheduleArr.find((item) => item.date);
      dispatch(actions.deletePastScheduleDoctorRedux(pastSchedule.date));
    }
  }, [pastScheduleArr]);

  const getPastDoctorSchedule = async () => {
    let res = await getPastDoctorScheduleAPI();
    if (res && res.errCode === 0) {
      setPastScheduleArr(res.data);
    }
  };

  return (
    <Fragment>
      <Router history={history}>
        <div className="main-container">
          <div className="content-container">
            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <Route
                  path={"/doctor/"}
                  component={userIsAuthenticated(Doctor)}
                />
                <Route path={path.HOMEPAGE} component={HomePage} />
                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                <Route
                  path={path.DETAIL_SPECIALTY}
                  component={DetailSpecialty}
                />
                <Route
                  path={path.VERIFY_EMAIL_BOOKING}
                  component={VerifyEmail}
                />
                <Route path={path.FORGOT_PASSWORD} component={ForgotPassword} />
                <Route path={path.RESER_PASSWORD} component={ResetPassword} />
              </Switch>
            </CustomScrollbars>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
