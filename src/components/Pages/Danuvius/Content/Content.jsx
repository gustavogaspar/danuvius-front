import React, { Component } from "react";
import Logout from "./Logout/Logout";
import NewRequest from "./NewRequest";
import Reports from "./Reports/Reports";

class Content extends Component {
  state = {};
  render() {
      if(this.props.activeContent === "Reports")
      return <Reports />;
      if(this.props.activeContent === "NewRequest")
      return <NewRequest  appState={this.props.appState}/>;
      if(this.props.activeContent === "Logout")
      return <Logout />;

}
}

export default Content;
