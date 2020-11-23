import React, { Component } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import logo from "../../../assets/logo.png";
class LandingPage extends Component {
  state = {};
  render() {
    return (
      <Grid padded verticalAlign="middle">
        <Grid.Column width={4}>
          <Image src={logo} />
        </Grid.Column>
        <Grid.Column width={9}>
          <Header as="h2">About Danuvius</Header>
          <p>
            Home office work has become more and more common in companies and,
            as a result, many people have been in pain for many hours sitting on
            their computer. Danuvius is an application that assists in the
            detection of postural addictions that can generate some injury over
            time.{" "}
          </p>
          <p>
            Danuvius uses artificial intelligence to detect the user's body
            posture, evaluates which points offer risk using{" "}
            <b>REBA (Rapid Entire Body Assessment)</b> methodology, which is an
            ergonomic analysis technique and, based on these results, suggests
            what adjustments need to be made in its workstation. Avoid pain, use
            Danuvius.
          </p>
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid>
    );
  }
}

export default LandingPage;
