import React, { Component } from "react";
import { getUser } from "../services/userService";

class User extends Component {
  state = {
    user: {},
  };

  componentDidMount = async () => {
    const { data: user } = await getUser(this.props.match.params.id);
    console.log(user);
    this.setState({ user });
  };

  render() {
    return <>user details</>;
  }
}

export default User;
