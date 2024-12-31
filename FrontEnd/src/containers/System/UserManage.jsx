import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
  //constructor dai dien cho class(tuong trung cho doi tuong cua chung ta)
  constructor(props) {
    super(props);
    //state o day chinh la thuoc tinh cua constructor
    //khi khai bao state cho class thi class se hieu rang no co 1 cai bien no can phai quan tam
    //state ton tai trong suot life cycle cua component cho den khi no bien mat khoi mang hinh
    //mot khi state thay doi thi dan den component cua chung ta tu dong thay doi theo
    this.state = {
      arrayUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.fetchUsersData();
  }

  fetchUsersData = async () => {
    const res = await getAllUsers("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        //muon ham render re-render lai thi dung set state
        arrayUsers: res.users,
      });
    }
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUser = async (data) => {
    try {
      const res = await createNewUserService(data);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.fetchUsersData();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      const res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.fetchUsersData();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      userEdit: user,
    });
    this.toggleEditUserModal();
  };

  doEditUser = async (user) => {
    try {
      const res = await editUserService(user);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.fetchUsersData();
        this.setState({
          isOpenModalEditUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
    console.log("click save user:", user);
  };

  /*
    Life cycle
    Run component:
    1. Run contructor -> init state
    2. Did mount (call api -> set state) : born ; unmount
    3. Render (re-render)
  */
  render() {
    return (
      <div className="users-container">
        <div className="title text-center">Manage users</div>
        <div className="mx-5 mt-2">
          <button
            className="btn btn-primary px-3"
            onClick={() =>
              this.setState({
                isOpenModalUser: !this.state.isOpenModalUser,
              })
            }
          >
            <i className="fas fa-plus"></i> Add new users
          </button>
        </div>
        <div className="users-table mx-5 mt-3">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>Full name</th>
                <th>Address</th>
                <th>RoleId</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.arrayUsers &&
                this.state.arrayUsers.length > 0 &&
                this.state.arrayUsers.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.email}</td>
                      <td>{user.fullName}</td>
                      <td>{user.address}</td>
                      <td>{user.roleId}</td>
                      <td>
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
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <ModalUser
          isOpenModalUser={this.state.isOpenModalUser}
          toggleUserModal={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            userEdit={this.state.userEdit}
            editUser={this.doEditUser}
            isOpenModalEditUser={this.state.isOpenModalEditUser}
            toggleEditUserModal={this.toggleEditUserModal}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
