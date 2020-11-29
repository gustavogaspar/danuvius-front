import TopMenu from "./components/UI/TopMenu/TopMenu";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/Pages/LandingPage";
import SignUp from "./components/Pages/SignUp/SignUp";
import { Header } from "semantic-ui-react";
import paths from "./data/APIPaths.json";
import SignIn from "./components/Pages/SignIn";
import Danuvius from "./components/Pages/Danuvius/Danuvius";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { loading: false, redirect: null };
  }

  changeAuthToken(newToken) {
    localStorage.setItem("authToken", newToken);
    return console.log("Token Information Stored");
  }
  changeEmail(email) {
    localStorage.setItem("email", email);
    return console.log(
      "Email Information Stored - ",
      localStorage.getItem("email")
    );
  }
  collectUserInfo() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("authToken")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    this.setState({ loading: true }, () => {
      fetch(
        paths.userInfoPath + "?email=" + localStorage.getItem("email"),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let userInfo = JSON.parse(result);
          let userID = userInfo.items[0].userid;
          localStorage.setItem("userID", userID);
          this.collectReports(userID);
        })
        .then(() => {
          console.log(
            "UserID Information Stored",
            localStorage.getItem("userID")
          );
        })
        .catch((error) => console.log("error", error));
    });
  }

  collectReports(userID) {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("authToken")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(paths.getResultsPath + "?userid=" + userID, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let resultJSON = JSON.parse(result);
        console.log("resultJSON -", resultJSON);
        let onlyItems = resultJSON.items;
        console.log("onlyItems -", onlyItems);
        let strItems = JSON.stringify(onlyItems);
        console.log("strItems -", strItems);
        localStorage.setItem("reports", strItems);
        this.setState({ loading: false, redirect: "/danuvius" });
      })
      .catch((error) => console.log("error", error));
  }

  render() {

    return (
      <div className="App">
        <BrowserRouter>
          <Header>
            <TopMenu
              changeAuthToken={this.changeAuthToken.bind(this)}
              authToken={localStorage.getItem("authToken")}
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
                collectUserInfo={this.collectUserInfo.bind(this)}
                collectReports={this.collectReports.bind(this)}
                loading = {this.state.loading}
                redirect = {this.state.redirect}
              />
            )}
          />
        </BrowserRouter>
        <div className="footer">
          Project Danuvius is powered by Oracle Cloud Infraestructure
        </div>
      </div>
    );
  }
}

export default App;
