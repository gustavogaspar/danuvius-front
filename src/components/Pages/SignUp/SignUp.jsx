import React, { Component } from "react";
import paths from "../../../data/APIPaths.json";

import {
  Form,
  Label,
  Segment,
  Container,
  Header,
  Select,
  Modal,
  Button,
} from "semantic-ui-react";

class SignUp extends Component {
  constructor() {
    super();
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.role = [
      { key: "hr", value: "hr", text: "Human Resources" },
      { key: "em", value: "em", text: "Employee" },
    ];
    this.organization = "";
    this.tempAuthToken = "";
    this.userid = "";
    this.state = { modal: false, response: "Loading..." };
  }

  _handlerChangeFirstName(e) {
    e.stopPropagation();
    this.firstName = e.target.value;
  }

  _handlerChangeLastName(e) {
    e.stopPropagation();
    this.lastName = e.target.value;
  }

  _handlerChangeEmail(e) {
    e.stopPropagation();
    this.email = e.target.value;
  }

  _handlerChangePassword(e) {
    e.stopPropagation();
    this.password = e.target.value;
  }

  _handlerChangeRole(e) {
    e.stopPropagation();
    this.role = e.target.value;
  }

  _handlerChangeOrganization(e) {
    e.stopPropagation();
    this.organization = e.target.value;
  }

  _handlerModal() {
    const newState = !this.state.modal;
    this.setState({ modal: newState });
  }

  _createIDCSUser(e) {
    e.preventDefault();
    e.stopPropagation();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      schemas: [
        "urn:ietf:params:scim:schemas:core:2.0:User",
        "urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User",
      ],
      userName: this.email,
      password: this.password,
      "urn:ietf:params:scim:schemas:oracle:idcs:extension:selfRegistration:User": {
        selfRegistrationProfile: {
          value: paths.selfRegistrationValue,
          type: "SelfRegistrationProfile",
        },
        consentGranted: true,
      },
      "urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User": {
        creationMechanism: "idcsui",
      },
      name: { givenName: this.firstName, familyName: this.lastName },
      emails: [{ value: this.email, primary: true, type: "work" }],
      displayName: this.firstName + " " + this.lastName,
      "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {},
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(paths.idcsPath, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        let newUserID = JSON.parse(result);
        if (newUserID.status !== 200) {
          let err = " [ IDCS ]  - " + newUserID.detail;
          this.setState({ response: err });
        }
        this.userid = newUserID.id;
        console.log(this.userid);
        var getTokenHeader = new Headers();
        getTokenHeader.append(
          "Authorization",
          "Basic MjA4N2I2NzdkOTM4NGFjNjg0YmRmZGE4YTgwZDVkNGQ6ZDBjOTFkMjUtOTFjOS00MGE1LWE5OTEtOTU0MjA1YTZlOWNi"
        );
        getTokenHeader.append(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "password");
        urlencoded.append("scope", "danuviusprojectdanuviusapi");
        urlencoded.append("username", this.email);
        urlencoded.append("password", this.password);

        var getTokenOptions = {
          method: "POST",
          headers: getTokenHeader,
          body: urlencoded,
          redirect: "follow",
        };

        fetch(paths.getTokenPath, getTokenOptions)
          .then((response) => response.text())
          .then((result) => {
            this.tempAuthToken = JSON.parse(result);
            //console.log(this.tempAuthToken.access_token);
            this.props.changeAuthToken(this.tempAuthToken.access_token);

            var dbHeader = new Headers();
            dbHeader.append(
              "Authorization",
              "Bearer " + this.tempAuthToken.access_token
            );
            dbHeader.append("Content-Type", "application/json");

            var dbInsert = JSON.stringify({
              USERID: this.userid,
              FIRSTNAME: this.firstName,
              LASTNAME: this.lastName,
              EMAIL: this.email,
              TIPO: this.role,
              ORG: this.organization,
            });

            var dbOptions = {
              method: "POST",
              headers: dbHeader,
              body: dbInsert,
              redirect: "follow",
            };

            fetch(paths.newDBUserPath, dbOptions)
              .then((response) => response.text())
              .then((result) => {
                console.log(result);
                let newUserID = JSON.parse(result);
                if (newUserID.status !== 200) {
                  let err =
                    this.state.response +
                    "  [ DB Connection ] - " +
                    newUserID.message;
                  this.setState({ response: err });
                } else {
                  this.setState({ response: "User Created Successfully" });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            this.setState({ response: error });
          });
      })
      .catch((error) => {
        this.setState({ response: error });
      });
  }

  render() {
    return (
      <Container text>
        <Segment size="tiny">
          <Header as="h3" textAlign="center">
            Sign Up
          </Header>
          <Form onSubmit={this._createIDCSUser.bind(this)}>
            <Form.Field>
              <Label as="a" color="brown" ribbon>
                {" "}
                First Name{" "}
              </Label>
              <input
                type="text"
                onChange={this._handlerChangeFirstName.bind(this)}
              />
            </Form.Field>
            <Form.Field>
              <Label as="a" color="brown" ribbon>
                {" "}
                Last Name{" "}
              </Label>
              <input
                type="text"
                onChange={this._handlerChangeLastName.bind(this)}
              />
            </Form.Field>
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
            <Form.Field>
              <Label as="a" color="brown" ribbon>
                {" "}
                Role{" "}
              </Label>
              <Select
                placeholder="Select your role"
                options={this.role}
                onChange={this._handlerChangeRole.bind(this)}
              />
            </Form.Field>
            <Form.Field>
              <Label as="a" color="brown" ribbon>
                {" "}
                Organization{" "}
              </Label>
              <input
                type="text"
                onChange={this._handlerChangeOrganization.bind(this)}
              />
            </Form.Field>
            <Form.Button
              color="brown"
              onClick={this._handlerModal.bind(this)}
              fluid
            >
              Submit
            </Form.Button>
            <Modal open={this.state.modal}>
              <Header icon="settings" content="Status" />
              <Modal.Content>{this.state.response}</Modal.Content>
              <Modal.Actions>
                <Button color="green" onClick={this._handlerModal.bind(this)}>
                  OK
                </Button>
              </Modal.Actions>
            </Modal>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default SignUp;
