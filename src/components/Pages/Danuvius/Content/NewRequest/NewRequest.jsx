import React, { Component } from "react";
import { Form, Label, Header, Modal, Button } from "semantic-ui-react";
import paths from "../../../../../data/APIPaths.json";

class NewRequest extends Component {
  constructor() {
    super();
    this.userID = {};
    this.state = { modal: false, status: "Loading..." };
  }

  _sendRequest() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("authToken")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id_user: localStorage.getItem("userID"),
      solicitacao: "Relatório de Postura",
      status: "Open",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(paths.newRequestPath, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        let newUserID = JSON.parse(result);
        if (newUserID.message !== "Solicitação Cadastrada com Sucesso") {
          let err =
            "Session Expired please Login again";
          this.setState({ response: err });
        } else {
          this.setState({ response: "Request created successfully" });
        }
      })
      .catch((error) => console.log("error", error));
  }

  _handlerModal() {
    const newState = !this.state.modal;
    this.setState({ modal: newState });
  }

  render() {
    return (
      <Form onSubmit={this._sendRequest.bind(this)}>
        <Header>New Request</Header>
        <Form.Field>
          <Label as="a" color="brown" ribbon>
            {" "}
            User Email{" "}
          </Label>
          <input type="text" disabled value={localStorage.getItem("email")} />
        </Form.Field>
        <Form.Field>
          <Label as="a" color="brown" ribbon>
            {" "}
            Type{" "}
          </Label>
          <input type="text" disabled value="Ergonomic Report" />
        </Form.Field>
        <Form.Field>
          <Label as="a" color="brown" ribbon>
            {" "}
            User ID{" "}
          </Label>
          <input type="text" disabled value={localStorage.getItem("userID")} />
        </Form.Field>
        <Form.Button
          color="brown"
          onClick={this._handlerModal.bind(this)}
          fluid
        >
          Submit
        </Form.Button>
        <Modal size="tiny" open={this.state.modal}>
          <Modal.Header>Request Status</Modal.Header>
          <Modal.Content>
            <p>{this.state.status}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this._handlerModal.bind(this)}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Form>
    );
  }
}

export default NewRequest;
