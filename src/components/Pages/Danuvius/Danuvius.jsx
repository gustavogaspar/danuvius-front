import React, { Component } from "react";
import { Container, Menu, Grid, Segment } from "semantic-ui-react";
import Content from "./Content/Content";

class Danuvius extends Component {
  state = { activeItem: "Reports" };

  handleItemClick = (e, { name }) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ activeItem: name })};

  render() {
    const { activeItem } = this.state;

    return (
      <Container fluid>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={3}>
              <Menu vertical>
                <Menu.Item
                  name="Reports"
                  active={activeItem === "requests"}
                  onClick={this.handleItemClick}
                >
                  Reports
                </Menu.Item>

                <Menu.Item
                  name="NewRequest"
                  active={activeItem === "newRequest"}
                  onClick={this.handleItemClick}
                >
                  New Request
                </Menu.Item>

                <Menu.Item
                  name="Logout"
                  active={activeItem === "logout"}
                  onClick={this.handleItemClick}
                >
                  Logout
                </Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column width={13}>
              <Segment>
                <Content activeContent={this.state.activeItem} appState={this.props.appState}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Danuvius;
