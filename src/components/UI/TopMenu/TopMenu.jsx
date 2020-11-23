import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Segment, Grid } from "semantic-ui-react";
import logo from "../../../assets/logo.jpeg";

class TopMenu extends Component {
  render() {
    if (localStorage.getItem("authToken")) {
      return (
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Segment inverted color="olive" textAlign="center" raised>
                <Menu secondary size="large">
                  <Image src={logo} size="tiny" wrapped circular />
                </Menu>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return (
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Segment inverted color="olive" textAlign="center" raised>
                <Menu secondary size="large" >
                  <Image src={logo} size="tiny" wrapped circular />
                  <Menu.Item name="Project Danuvius" as={Link} to="/" />
                  <Menu.Menu position="right">
                    <Menu.Item name="Sign Up" as={Link} to="/signup" />
                    <Menu.Item name="Sign In" as={Link} to="/signin" />
                  </Menu.Menu>
                </Menu>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
  }
}

export default TopMenu;
