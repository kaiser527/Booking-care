import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
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
        email: "",
        password: "",
        fullName: "",
        address: "",
        phoneNumber: "",
        roleId: 1,
      });
    });
  };

  componentDidMount() {}

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

  handleSubmitAddNewUser = () => {
    //validate
    let isValid = this.checkValidInput();
    if (isValid) {
      this.props.createNewUser(this.state); //truyen toan bo state cho component cha
    }
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

  render() {
    const { isOpenModalUser, toggleUserModal } = this.props;
    return (
      <Modal
        isOpen={isOpenModalUser}
        toggle={toggleUserModal}
        size="lg"
        className="pt-5 modal-user-container"
        backdrop="static"
      >
        <ModalHeader toggle={toggleUserModal}>Create a new user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email:</label>
              <input
                type="email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeInput(event, "email")}
              />
            </div>
            <div className="input-container">
              <label>Password:</label>
              <input
                type="password"
                value={this.state.password}
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
            onClick={() => this.handleSubmitAddNewUser()}
          >
            Add new
          </Button>
          <Button color="secondary" className="px-3" onClick={toggleUserModal}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
