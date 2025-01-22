import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import Header from "../containers/Header/Header";
import UserRedux from "../containers/System/Admin/UserRedux";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import { USER_ROLE } from "../utils";

const System = () => {
  const systemMenuPath = useSelector((state) => state.app.systemMenuPath);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <>
      {isLoggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          {userInfo?.roleData.roleId === USER_ROLE.ADMIN && (
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          )}
          {userInfo?.roleData.roleId === USER_ROLE.DOCTOR && (
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
