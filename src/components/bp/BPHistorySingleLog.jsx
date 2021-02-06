import React from "react";
import { Card, ListGroup, Col, Row, Container } from "react-bootstrap";

function BPHistorySingleLog(props) {
  const item = props.historyItem;

  const d = new Date(item.date_time);
  const offsetMs = d.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(d.getTime() - offsetMs);
  const dateTime = dateLocal.toLocaleString().split(", ");
  const date = dateTime[0];
  const time = dateTime[1];

  return item ? (
    <>
      <Card.Header>
        <Card.Title className="history-title">
          <Col>{time}</Col> <Col>{date}</Col>
        </Card.Title>
      </Card.Header>

      <Card.Body>
        <ListGroup>
          <ListGroup.Item>
            <Row noGutters>
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
          <ListGroup.Item>
            {item.note.length > 0 ? (
              <Row noGutters className="BPHistory-note">
                <p>Note:</p>
                <Container>{item.note}</Container>
              </Row>
            ) : null}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </>
  ) : null;
}

export default BPHistorySingleLog;
