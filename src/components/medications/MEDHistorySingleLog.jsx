import React, { useState } from "react";
import { Card, ListGroup, Col } from "react-bootstrap";
import RemoveLogModal from "./RemoveLogModal";

export default function MEDHistorySingleLog(props) {
  const item = props.historyItem;

  const [showRemoveLogModal, setShowRemoveLogModal] = useState(false);

  // Preparing datetime from item to user's local time.
  var dateTime = new Date(Date.parse(item.time_taken));
  dateTime = dateTime.toLocaleString().split(", ");
  const date = dateTime[0];
  const time = dateTime[1];

  const InnerMap = (props) => {
    const i = props.data;
    return (
      <>
        <Col>{i.name}</Col>
        <Col style={{ alignItems: "center" }}>{i.strength}</Col>
        <Col style={{ alignItems: "center" }}>{i.quantity}</Col>
      </>
    );
  };

  return item ? (
    <Card
      className="outerHistory-card"
      onClick={() => setShowRemoveLogModal(!showRemoveLogModal)}
    >
      <Card.Header>
        <Card.Title className="history-title">
          <Col>{time}</Col> <Col>{date}</Col>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          {item.medication_quantities ? (
            item.medication_quantities.map((med) => {
              return (
                <ListGroup.Item key={med.id} className="history-listItem">
                  <InnerMap data={med} />
                </ListGroup.Item>
              );
            })
          ) : (
            <Col style={{ alignItems: "center" }}>
              <p>No Data to Display</p>
              <p>Please Add an entry to get started</p>
            </Col>
          )}
        </ListGroup>
      </Card.Body>

      {showRemoveLogModal ? (
        <RemoveLogModal
          log={item}
          setGetHistory={props.setGetData}
          setGetMedications={props.setGetMedications}
          show={showRemoveLogModal}
          setShow={setShowRemoveLogModal}
        />
      ) : null}
    </Card>
  ) : null;
}
