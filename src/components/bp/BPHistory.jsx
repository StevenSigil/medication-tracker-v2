import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

import axiosInstance from "../../util/axios";
import BPHistorySingleLog from "./BPHistorySingleLog";

function BPHistory(props) {
  const getData = props.getData;
  const setGetData = props.setGetData;
  const [data, setData] = useState([]);

  useEffect(() => {
    // Retrieve's the logs or sets null log if none are present.
    if (data.length === 0 || getData === true) {
      axiosInstance
        .get("bp/get_post_bp_logs/")
        .then((response) => {
          if (response.data.length === 0) {
            setData([
              { id: null, sys: null, dia: null, pulse: null, note: null },
            ]);
          } else setData(response.data.reverse());
        })
        // .catch((error) => console.log(error));
    }
    return () => {
      setGetData(false);
    };
  }, [data, getData, setGetData]);

  return (
    <>
      <h2>Your recent history</h2>

      {data.map((d) => {
        return (
          <Card className="outerHistory-card" key={d.id}>
            <BPHistorySingleLog historyItem={d} />
          </Card>
        );
      })}
    </>
  );
}

export default BPHistory;
