import React from "react";
import { Card, ListGroup, Col, Container } from "react-bootstrap";

function HistorySingleLog(props) {
  const item = props.historyItem;

  var dateTime = new Date(Date.parse(item.time_taken));
  dateTime = dateTime.toLocaleString().split(", ");
  const date = dateTime[0];
  const time = dateTime[1];

  const InnerMap = (props) => {
    const i = props.data;
    return (
      <>
        <Container style={{ display: "inline-flex" }}>
          <Col>
            {i.name}
            {i.strength} - ({i.quantity})
          </Col>
        </Container>
      </>
    );
  };

  return item ? (
    <>
      <Card.Header>
        <Card.Title>
          {time} {date}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          {item.medication_quantities.map((med) => {
            return (
              <ListGroup.Item
                key={med.id}
                style={{ backgroundColor: "transparent" }}
              >
                <InnerMap data={med} />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </>
  ) : null;
}

export default HistorySingleLog;
