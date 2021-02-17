import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Games from './components/games';
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import GameForm from "./components/gameForm";
import LoginModal from "./components/loginModal";
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import auth from './services/authService';
import GameView from './components/gameView';
import ProtectedRoute from './components/common/protectedRoute';
import LoginContext from './contexts/loginContext';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import User from './components/user';
import Users from './components/users';
import Genres from './components/genres';

class App extends Component {
  state = {

    user: "",
    show: "false"
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  showModal() {
    this.setState({ show: true });
  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log(user);
    this.setState({ user });
  }
  render() {

    const { user } = this.state;

    return (
      <LoginContext.Provider value={{
        onHandleShow: this.handleShow,
        onHandleClose: this.handleClose,
        show: this.state.show,
        showModal: this.showModal,
        user: this.state.user
      }}>
        <ToastContainer />
        <LoginModal />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            {/* <Route path="/login" component={LoginForm} /> */}
            <Route path="/logout" component={Logout} />
            <ProtectedRoute
              path="/gameForm/:id"
              component={GameForm}
            />
            <ProtectedRoute
              path="/games/new"
              component={GameForm}
            />
            <Route path="/games/:id" component={GameView} />
            <Route path="/user/:id" component={User} />
            <Route path="/users" component={Users} />
            <Route path="/genres" component={Genres} />
            <Route path="/games"
              render={props => <Games {...props} user={this.state.user} />}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect exact from="/" to="/games" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </LoginContext.Provider>

);
}
}

export default App;
