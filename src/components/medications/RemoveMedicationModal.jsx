import React from "react";
import { Modal, Button, Container } from "react-bootstrap";

import axiosInstance from "../../util/axios";

function RemoveMedicationModal(props) {
  const show = props.show;
  const setShow = props.setShow;
  const goBack = props.goBack;
  const resetModal = props.resetModal;

  const medications = props.selection;
  const getUsersMedications = props.getUsersMedications;

  function handleDelete() {
    medications.forEach((med) => {
      axiosInstance
        .post("medications/delete_medication/", { id: med.id })
        .then((response) => {
          // console.log(response);
          handleClose();
        })
        // .catch((error) => console.log(error));
    });
  }

  // POSSIBLE DEPRECATION OF FEATURE.
  //
  // function handleRemove() {
  // Used to remove a medication instance from a user's medications
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
        <Modal.Body>
          <h5>Your selection</h5>

          <Container>
            {medications.map((med) => {
              return (
                <li key={med.id}>
                  {med.name} {med.strength}
                </li>
              );
            })}
          </Container>
        </Modal.Body>
        <Modal.Body style={{ marginBottom: "16px" }}>
          <h5>Warning</h5>
          <Container>
            <h6>
              This action will remove the above medication(s) from ALL your log
              entries.
            </h6>

            <em>
              You will not be able to undo this action. Please confirm now.
            </em>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={goBack}>
            Go back
          </Button>
          <Button onClick={handleDelete} variant="danger">
            Confirm Delete
          </Button>
        </Modal.Footer>

        {/* POSSIBLE DEPRECATION OF REMOVE (from users medications) FEATURE.
        <Modal.Header>
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
