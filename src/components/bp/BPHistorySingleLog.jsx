import React from "react";
import { Card, ListGroup, Col, Row, Container } from "react-bootstrap";

function BPHistorySingleLog(props) {
  const item = props.historyItem;

  // Preparing date/time from item to user's local time.
  var dateTime = new Date(Date.parse(item.date_time));
  dateTime = dateTime.toLocaleString().split(", ");
  const date = dateTime[0];
  const time = dateTime[1];

  return (
    <>
      <Card.Header>
        <Card.Title className="history-title">
          <Col>{time}</Col> <Col>{date}</Col>
        </Card.Title>
      </Card.Header>

      <Card.Body>
        <ListGroup>
          <ListGroup.Item>
            <Row noGutters className="bpHistory-vitals">
              <Col>Systolic</Col>
              <Col>Diastolic</Col>
              <Col>Pulse</Col>
            </Row>
            <Row noGutters>
              <Col>{item.sys}</Col>
              <Col>{item.dia}</Col>
              <Col>{item.pulse}</Col>
            </Row>
          </ListGroup.Item>

          {item.note ? (
            <ListGroup.Item className="BPHistory-listGroup">
              <Row noGutters className="BPHistory-note">
                <p>Note:</p>
                <Container>{item.note}</Container>
              </Row>
            </ListGroup.Item>
          ) : null}
        </ListGroup>
      </Card.Body>
    </>
  );
}

export default BPHistorySingleLog;
