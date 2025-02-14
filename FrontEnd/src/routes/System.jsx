import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import Header from "../containers/Header/Header";
import UserRedux from "../containers/System/Admin/UserRedux";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import { USER_ROLE } from "../utils";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import ManageClinic from "../containers/System/Admin/Clinic/ManageClinic";

const System = () => {
  const systemMenuPath = useSelector((state) => state.app.systemMenuPath);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <>
      {isLoggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          {userInfo?.roleId === USER_ROLE.ADMIN && (
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route path="/system/manage-clinic" component={ManageClinic} />
              <Route
                path="/system/manage-specialty"
                component={ManageSpecialty}
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          )}
          {userInfo?.roleId === USER_ROLE.DOCTOR && (
            <Switch>
              <Route
                component={() => {
                  return <Redirect to="/doctor/manage-schedule" />;
                }}
              />
            </Switch>
          )}
        </div>
      </div>
    </>
  );
};

export default System;
