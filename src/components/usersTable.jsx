import React, { Component } from "react";
import Table from "./common/table";
import auth from "../services/authService";
import { Link } from "react-router-dom";

class usersTable extends Component {
  columns = [
    {
      path: "user_name",
      label: "Username",
      content: (user) => <Link to={`/users/${user.id}`}>{user.user_name}</Link>,
    },
    {
      path: "first_name",
      label: "name",
      content: (user) => user.first_name + " " + user.last_name,
    },
    { path: "creation_time", label: "Since" },
    { path: "uploads", label: "games" },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default usersTable;
