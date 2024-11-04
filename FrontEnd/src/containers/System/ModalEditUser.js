import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      roleId: 1,
    };
    this.listenToEmitter();
  }

  //fire event: emitter.emit
  //listen event: emiiter.on
  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
        id: "",
        email: "",
        password: "",
        fullName: "",
        address: "",
        phoneNumber: "",
        roleId: 1,
      });
    });
  };

  componentDidMount() {
    if (!_.isEmpty(this.props.userEdit)) {
      this.setState({
        id: this.props.userEdit.id,
        email: this.props.userEdit.email,
        password: "hardcode",
        fullName: this.props.userEdit.fullName,
        address: this.props.userEdit.address,
        phoneNumber: this.props.userEdit.phoneNumber,
        roleId: this.props.userEdit.roleId,
      });
    }
  }

  checkValidInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "fullName", "address", "roleId"];
    for (let i = 0; i < arrInput.length; i++) {
      //this.state.email,password,...
      if (!this.state[arrInput[i]]) {
        console.log("check array", this.state[arrInput[i]]);
        //chi can 1 trong cac truong trong thi bien isInvalid se bang false va ngay lap tuc dung vong lap ngay tai truong do
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break; //sau khi check validate thi thoat ra ngoai vong lap
      }
    }
    return true;
  };

  handleOnChangeInput = (event, id) => {
    //bad code -> modify state
    /*
      this.state = {
        email: "",
        password: "",
        fullName: "",
        address: "",
        roleId: 1,
      };
      this.state.email === this.state['email']
    */
    // this.state[id] = event.target.value;
    // this.setState({
    //   ...this.state,
    // });

    //good code
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidInput();
    if (isValid) {
      this.props.editUser(this.state); //truyen toan bo state cho component cha
    }
  };

  render() {
    const { isOpenModalEditUser, toggleEditUserModal } = this.props;
    return (
      <Modal
        isOpen={isOpenModalEditUser}
        toggle={toggleEditUserModal}
        size="lg"
        className="pt-5 modal-user-container"
        backdrop="static"
      >
        <ModalHeader toggle={toggleEditUserModal}>Edit a user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email:</label>
              <input
                type="email"
                value={this.state.email}
                disabled
                onChange={(event) => this.handleOnChangeInput(event, "email")}
              />
            </div>
            <div className="input-container">
              <label>Password:</label>
              <input
                type="password"
                value={this.state.password}
                disabled
                onChange={(event) =>
                  this.handleOnChangeInput(event, "password")
                }
              />
            </div>
            <div className="input-container max-width-input">
              <label>Full name:</label>
              <input
                type="text"
                value={this.state.fullName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "fullName")
                }
              />
              <div className="input-container max-width-input">
                <label>Address:</label>
                <input
                  type="text"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                />
              </div>
              <div className="input-container max-width-input">
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="input-container">
                <label>Role:</label>
                <select
                  value={this.state.roleId}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "roleId")
                  }
                >
                  <option value="1">Admin</option>
                  <option value="2">Doctor</option>
                  <option value="3">Patient</option>
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveUser()}
          >
            Save changes
          </Button>
          <Button
            color="secondary"
            className="px-3"
            onClick={toggleEditUserModal}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
