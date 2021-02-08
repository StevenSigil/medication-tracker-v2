import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import ISODateTimeToLocalView, {
  localSplitDTStringToISO,
} from "../../util/dateTime";
import axiosInstance from "../../util/axios";

function MedDownloadForm(props) {
  const handleClose = props.handleClose;

  const [data, setData] = useState({
    start: ISODateTimeToLocalView().date,
    end: ISODateTimeToLocalView().date,
    time_offset: new Date().getTimezoneOffset(),
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit() {
    // Submit and return the logs requested in csv download

    const startDateTime = localSplitDTStringToISO(
      // Use util/ function to change users local (displayed) date/time to API valid date/time
      data.start,
      new Date().toISOString().slice(11) // time
    );

    const endDateTime = localSplitDTStringToISO(
      data.end,
      new Date().toISOString().slice(11) // time
    );

    console.log(startDateTime, endDateTime);

    // Set the file name to include start/end times for user convenience
    const fileName = "medications_" + data.start + "_" + data.end + ".csv";

    axiosInstance
      .post("logs/download_logs/", {
        start: startDateTime,
        end: endDateTime,
        time_offset: data.time_offset,
      })
      .then((response) => {
        // Prep the response to proper downloaded text doc.
        let blob = new Blob([response.data]);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <p style={{ textAlign: "center" }}>
        Please select a start and end date to download
      </p>
      <Form className="download-form">
        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            id="download-MED-startDate"
            type="date"
            name="start"
            value={data.start}
            onChange={handleChange}
            aria-label="Start Date"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            id="download-MED-endDate"
            type="date"
            name="end"
            value={data.end}
            onChange={handleChange}
            aria-label="End Date"
          />
        </Form.Group>
      </Form>

      <Modal.Footer className="downloadButton-footer">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="success" onClick={handleSubmit}>
          Download
        </Button>
      </Modal.Footer>
    </>
  );
}

export default MedDownloadForm;
