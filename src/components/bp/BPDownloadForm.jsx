import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import axiosInstance from "../../util/axios";

function BPDownloadForm() {
  const [data, setData] = useState({
    start: "",
    end: "",
  });

  function convertTime(input) {
    // Used to append data to input before sending to api
    input = input.split("-");
    var date = new Date().setFullYear(input[0], input[1] - 1, input[2]);
    date = new Date(date).toISOString();
    return date;
  }

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
    const start = convertTime(data.start);
    const end = convertTime(data.end);

    axiosInstance
      .post("bp/bp_csv/", { start: start, end: end })
      .then((response) => {
        let blob = new Blob([response.data]);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute(
          "download",
          "bloodpressure-" +
            start.slice(0, 10) +
            "--" +
            end.slice(0, 10) +
            ".csv"
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      
        <p>Please select a start and end date to download</p>
        <Form>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              id="download-BP-start"
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
              id="download-BP-end"
              type="date"
              name="end"
              value={data.end}
              onChange={handleChange}
              aria-label="End Date"
            />
          </Form.Group>
        </Form>
      
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          Download
        </Button>
      </Modal.Footer>
    </>
  );
}

export default BPDownloadForm;
