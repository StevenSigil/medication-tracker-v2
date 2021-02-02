import React, { useState } from "react";
import { Row } from "react-bootstrap";

import axiosInstance from "../util/axios";

import CreateMedModal from "./CreateMedModal";
import SingleMedication from "./SingleMedication";

function UsersMedications(props) {
  const [usersMedications, setUsersMedications] = useState([]);

  function getUsersMedications() {
    // Sets the medications the user wants on the're dashboard
    axiosInstance
      .get("medications/medication_to_user/")
      .then((response) => {
        console.log(response);
        setUsersMedications(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Row noGutters>
        {usersMedications.length !== 0
          ? usersMedications.map((med) => {
              return (
                <SingleMedication
                  key={med.id}
                  medication={med}
                  addMedication={props.addMedication}
                />
              );
            })
          : getUsersMedications()}
      </Row>

      <CreateMedModal
        show={props.showCreateMedModal}
        setShow={props.setShowCreateMedModal}
        getUsersMedications={getUsersMedications}
      />
    </>
  );
}

export default UsersMedications;
