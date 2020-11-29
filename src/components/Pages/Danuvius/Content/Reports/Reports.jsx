import React, { Component } from "react";
import { Header, Table } from "semantic-ui-react";

class Reports extends Component {

  _listGenerator() {
    let strItems = localStorage.getItem("reports");
    let reports = JSON.parse(strItems);
    return reports.reverse().map((item) => {
      console.log(item);
      return (
        <>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Reba Score</Table.HeaderCell>
              <Table.HeaderCell>Recommendations</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Score: {item.reba_score[0]}
                    <Header.Subheader>
                      {item.reba_score.substr(3)}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{item.recomend}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </>
      );
    });
  }

  render() {
    return (
      <>
        <Header>Reports</Header>
          <Table basic="very" celled>
            {this._listGenerator()}{" "}
          </Table>
      </>
    );
  }
}

export default Reports;
