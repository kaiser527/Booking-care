import React, { Component } from "react";
import "./TableManageUser.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        userRedux: this.props.users,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUser(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    return (
      <table id="TableManageUser">
        <thead>
          <tr>
            <th>Email</th>
            <th>Full name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>RoleId</th>
            <th>PositionId</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.userRedux &&
            this.state.userRedux.length > 0 &&
            this.state.userRedux.map((user, index) => {
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
                        onClick={() => this.handleEditUser(user)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => this.handleDeleteUser(user)}
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
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(actions.fetchAllUserRedux()),
    deleteUser: (id) => dispatch(actions.deleteUserRedux(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
