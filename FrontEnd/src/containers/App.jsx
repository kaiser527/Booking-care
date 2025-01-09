import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
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

const App = (props) => {
  const { persistor } = props;
  const [bootstrapped, setBootstrapped] = useState(persistor.getState());

  const handlePersistorState = () => {
    if (bootstrapped) {
      if (props.onBeforeLift) {
        Promise.resolve(props.onBeforeLift())
          .then(() => setBootstrapped({ bootstrapped: true }))
          .catch(() => setBootstrapped({ bootstrapped: true }));
      } else {
        setBootstrapped({ bootstrapped: true });
      }
    }
  };

  useEffect(() => {
    handlePersistorState();
  }, []);

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
                <Route path={path.HOMEPAGE} component={HomePage} />
                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
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
