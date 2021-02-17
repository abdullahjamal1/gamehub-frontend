import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
    usernameFeedback: {},
    submitFeedback: ""
  };

  schema = {
    username: Joi.string().required().label("Username").email(),
    password: Joi.string().required().label("Password").min(5),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      // auth.loginWithJwt(response.headers["Authorization"]);
      // window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
      return;
    }
    this.setState({ })
  };

  handleOnUsernameChange = async (currentTarget) => {
    // send get request to /username with username as param to check if it is unique
    this.handleChange(currentTarget);
    const { currentTarget: username } = currentTarget;

    let message, isValid;
    const { data: response } = await auth.isUsernameUnique(username.value);
    if (response) {
      message = "username is unique :)";
      isValid = true;
    } else {
      message = "username already used";
      isValid = false;
    }
    const usernameFeedback = { message, isValid };
    this.setState({ usernameFeedback });
  };

  renderFeedbackClass = () => {
    const { message, isValid } = this.state.usernameFeedback;
    if (message === null) return;
    if (isValid) return "alert alert-success";
    else return "alert alert-danger";
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "username",
            "Username",
            "text",
            this.handleOnUsernameChange
          )}
          <div className={this.renderFeedbackClass()}>
            {this.state.usernameFeedback.message}
          </div>
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
