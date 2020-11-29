import React, { Component } from "react";
import { Grid, Header, Image, Segment } from "semantic-ui-react";
import logo from "../../../assets/logo.png";



class LandingPage extends Component {
  state = {};
  render() {
    return (
      <Grid padded verticalAlign="middle">
        <Grid.Row>
        <Grid.Column width={4}>
          <Image src={logo} />
        </Grid.Column>
        <Grid.Column width={9}>
          <Segment>
          <Header as="h2"><div className="title">About Danuvius</div></Header>
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
          </Segment>
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default LandingPage;
