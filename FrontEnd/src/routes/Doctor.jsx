import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManagePatient from "../containers/System/Doctor/ManagePatient";

const Doctor = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      {isLoggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
            <Route path="/doctor/manage-patient" component={ManagePatient} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Doctor;
