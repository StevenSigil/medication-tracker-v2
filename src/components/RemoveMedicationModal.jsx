import React from "react";
import { Modal, Button } from "react-bootstrap";
import axiosInstance from "../util/axios";

function RemoveMedicationModal(props) {
  const show = props.show;
  const setShow = props.setShow;
  const resetModal = props.resetModal;
  const medications = props.selection;
  const getUsersMedications = props.getUsersMedications;

  function handleDelete() {
    medications.forEach((med) => {
      axiosInstance
        .post("medications/delete_medication/", { id: med.id })
        .then((response) => {
          console.log(response);
          handleClose();
        })
        .catch((error) => console.log(error));
    });
  }

  // function handleRemove() {
  //   medications.forEach((med) => {
  //     axiosInstance
  //       .post("medications/remove_medication/", { id: med.id })
  //       .then((response) => {
  //         console.log(response);
  //         handleClose();
  //       })
  //       .catch((error) => console.log(error));
  //   });
  // }

  function handleClose() {
    setShow(false);
    resetModal();
    getUsersMedications();
  }

  return (
    <>
      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title style={{ margin: "auto" }}>Confirm action</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ marginBottom: "16px" }}>
          <h5>Your selection</h5>
          <ul style={{ paddingLeft: "3rem", margin: "16px 0 16px" }}>
            {medications.map((med) => {
              return (
                <li key={med.id}>
                  {med.name} {med.strength}
                </li>
              );
            })}
          </ul>
        </Modal.Body>
        <em style={{ margin: "-2rem 1rem 1rem" }}>
          You will not be able to undo this action. Please confirm now.
        </em>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Go back
          </Button>
          <Button onClick={handleDelete} variant="danger">
            Confirm Delete
          </Button>
        </Modal.Footer>

        {/* <Modal.Header>
          <Modal.Title>What would you like to do?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <h6>Remove these medications from you list?</h6>

          <Button onClick={handleRemove}>Remove</Button>
        </Modal.Body>
        <Modal.Body style={{ textAlign: "center" }}>
          <h6>Delete these medications from the database?</h6>
          <strong>
            <h5 style={{ textAlign: "center" }}>WARNING!</h5>
          </strong>
          <p>
            This action cannot be undone and will remove from any other users
            list as well as your logs.
          </p>

          <Button onClick={handleDelete} variant="danger">
            Confirm Delete
          </Button>
        </Modal.Body> */}
      </Modal>
    </>
  );
}

export default RemoveMedicationModal;
