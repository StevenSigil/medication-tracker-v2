import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axiosInstace from "../util/axios";

import HistorySingleLog from "./HistorySingleLog";
import DownloadDataModal from "./DownloadDataModal";

function History(props) {
  const getData = props.getData;
  const setGetData = props.setGetData;
  const [data, setData] = useState([]);
  const [showDownloadModal, setShowDownloadMoadal] = useState(false);

  useEffect(() => {
    if (data.length === 0 || getData === true) {
      axiosInstace
        .get("logs/users_logs/")
        .then((response) => {
          console.log(response);
          setData(response.data);
        })
        .catch((error) => console.log(error));
    }
    return () => {
      setGetData(false);
    };
  }, [data, getData, setGetData]);

  return data.length > 0 ? (
    <>
      <h4>Recent history</h4>
      {data.map((d) => {
        return (
          <Card className="outerHistory-card" bg="secondary" key={d.id}>
            <HistorySingleLog historyItem={d} />
          </Card>
        );
      })}

      <Button
        className="download-btn"
        variant="outline-danger"
        onClick={() => setShowDownloadMoadal(true)}
      >
        Download Data
      </Button>

      <DownloadDataModal
        show={showDownloadModal}
        setShow={setShowDownloadMoadal}
      />
    </>
  ) : null;
}

export default History;
