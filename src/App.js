import TopMenu from "./components/UI/TopMenu/TopMenu";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/Pages/LandingPage";
import SignUp from "./components/Pages/SignUp/SignUp";
import { Header } from "semantic-ui-react";
import SignIn from "./components/Pages/SignIn";
import Danuvius from "./components/Pages/Danuvius/Danuvius";

class App extends Component {
  constructor() {
    super();
    this.state = { authToken: "", email: "" };
  }

  changeAuthToken(newToken) {
    localStorage.setItem("authToken", newToken);
    this.setState({ authToken: newToken });
  }
  changeEmail(email) {
    localStorage.setItem("email", email)
    this.setState({ email: email });
  }

  render() {
    return (
      <BrowserRouter>
        <Header>
          <TopMenu
            changeAuthToken={this.changeAuthToken.bind(this)}
            authToken={this.state.authToken}
          />
        </Header>
        <Route path="/" exact render={() => <LandingPage />} />
        <Route
          path="/danuvius"
          exact
          render={() => <Danuvius appState={this.state} />}
        />
        <Route
          path="/signup"
          exact
          render={() => (
            <SignUp
              paths={this.paths}
              changeAuthToken={this.changeAuthToken.bind(this)}
            />
          )}
        />
        <Route
          path="/signin"
          exact
          render={() => (
            <SignIn
              paths={this.paths}
              changeEmail={this.changeEmail.bind(this)}
              changeAuthToken={this.changeAuthToken.bind(this)}
            />
          )}
        />
      </BrowserRouter>
    );
  }
}

export default App;
