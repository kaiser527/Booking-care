import React, { useEffect, useState } from "react";
import "./TableManageUser.scss";
import { useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";

const TableManageUser = (props) => {
  const [userRedux, setUserRedux] = useState([]);

  const dispatch = useDispatch();

  const users = useSelector((state) => state.admin.users);

  useEffect(() => {
    dispatch(actions.fetchAllUserRedux());
  }, []);

  useEffect(() => {
    const filteredData = users.filter((user) => user.email !== null);
    const nullUser = users.find((user) => user.email === null);
    if (nullUser) {
      dispatch(actions.deleteUserRedux(nullUser?.id));
    }
    setUserRedux(filteredData);
  }, [users]);

  const handleDeleteUser = (user) => {
    dispatch(actions.deleteUserRedux(user.id));
  };

  const handleEditUser = (user) => {
    props.handleEditUserFromParent(user);
  };

  return (
    <table id="TableManageUser">
      <thead>
        <tr>
          <th>
            <FormattedMessage id="manage-user.email" />
          </th>
          <th>
            <FormattedMessage id="manage-user.full-name" />
          </th>
          <th>
            <FormattedMessage id="manage-user.address" />
          </th>
          <th>
            <FormattedMessage id="manage-user.phone-number" />
          </th>
          <th>
            <FormattedMessage id="manage-user.gender" />
          </th>
          <th>
            <FormattedMessage id="manage-user.role" />
          </th>
          <th>
            <FormattedMessage id="manage-user.position" />
          </th>
          <th>
            <FormattedMessage id="manage-user.actions" />
          </th>
        </tr>
      </thead>
      <tbody>
        {userRedux &&
          userRedux.length > 0 &&
          userRedux.map((user, index) => {
            return (
              <tr key={`table-user-${index}`}>
                <td>{user.email}</td>
                <td>{user.fullName}</td>
                <td>{user.address}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.gender}</td>
                <td>{user.roleId}</td>
                <td>{user.positionId}</td>
                <td>
                  <span style={{ display: "flex" }}>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditUser(user)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDeleteUser(user)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </span>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableManageUser;
