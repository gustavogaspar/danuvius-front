import React, { Component } from "react";
import {
  Form,
  Label,
  Segment,
  Container,
  Header,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import paths from "../../../data/APIPaths.json";

class SignIn extends Component {
  constructor() {
    super();
    this.email = "";
    this.password = "";
    this.state = {
      showError: "",
    };
  }

  _handlerChangeEmail(e) {
    e.stopPropagation();
    this.email = e.target.value;
  }

  _handlerChangePassword(e) {
    e.stopPropagation();
    this.password = e.target.value;
  }

  _login() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + paths.idcsMainToken);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "password");
    urlencoded.append("scope", paths.scope);
    urlencoded.append("username", this.email);
    urlencoded.append("password", this.password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(paths.getTokenPath, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let message = JSON.parse(result);
        if (message.error) {
          console.log(message.error);
          this.setState({ showError: message });
        } else {
          this.props.changeEmail(this.email);
          this.props.changeAuthToken(message.access_token);
          this.props.collectUserInfo();
        }
      })
      .then(() => {
        if (this.props.loading === false) {
        }
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    if (this.props.loading) {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      );
    }
    if (this.props.redirect) {
      return <Redirect to={this.props.redirect} />;
    }
    return (
      <Container text>
        <Segment size="tiny">
          <Header as="h3" textAlign="center">
            <div className="title">Sign In</div>
          </Header>
          <Form onSubmit={this._login.bind(this)}>
            <Form.Field>
              <Label as="a" color="brown" ribbon>
                {" "}
                Email{" "}
              </Label>
              <input
                type="email"
                onChange={this._handlerChangeEmail.bind(this)}
              />
            </Form.Field>
            <Form.Field>
              <Label as="a" color="brown" ribbon>
                {" "}
                Password{" "}
              </Label>
              <input
                type="password"
                onChange={this._handlerChangePassword.bind(this)}
              />
            </Form.Field>
            <Form.Button color="brown" fluid>
              Submit
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default SignIn;
