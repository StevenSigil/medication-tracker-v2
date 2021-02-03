import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axiosInstace from "../util/axios";

import HistorySingleLog from "./HistorySingleLog";

function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0) {
      axiosInstace
        .get("logs/users_logs/")
        .then((response) => {
          console.log(response);
          setData(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [data]);

  return data.length > 0 ? (
    <>
      <h4>Recent history</h4>
      {data.map((d) => {
        return (
          <div style={{ padding: "20px" }} key={d.id}>
            <Card bg="secondary">
              <HistorySingleLog historyItem={d} />
            </Card>
          </div>
        );
      })}

      <Button variant="outline-danger">Download Data</Button>
    </>
  ) : null;
}

export default History;
