import React, { Component } from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import LoginContext from "../contexts/loginContext";
import { Redirect, Link } from "react-router-dom";

class LoginModal extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    console.log("submitted");
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <LoginContext.Consumer>
        {(context) => (
          <Modal show={context.show} onHide={context.onHandleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Login <i class="fa fa-sign-in" aria-hidden="true"></i>
              </Modal.Title>
            </Modal.Header>
            <form onSubmit={this.handleSubmit}>
              <ModalBody>
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                <Link to="forgotPassword">Forgot Password ?</Link>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={context.onHandleClose}>
                  Close
                </Button>
                {this.renderButton("Login")}
              </ModalFooter>
            </form>
          </Modal>
        )}
      </LoginContext.Consumer>
    );
  }
}

LoginModal.contextType = LoginContext;

export default LoginModal;
