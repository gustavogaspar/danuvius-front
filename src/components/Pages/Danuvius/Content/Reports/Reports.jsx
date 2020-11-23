import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import paths from "../../../../../data/APIPaths.json";

class Reports extends Component {
  constructor() {
    super();
    this.userID = {};
  }

  componentDidMount() {
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

    fetch(
      paths.getResultsPath + "?userid=*" + localStorage.getItem("userID"),
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }

  render() {
    return <Header>Reports</Header>;
  }
}

export default Reports;
