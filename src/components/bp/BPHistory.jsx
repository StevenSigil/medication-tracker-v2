import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axiosInstance from "../../util/axios";

import BPHistorySingleLog from "./BPHistorySingleLog";

function BPHistory(props) {
  const getData = props.getData;
  const setGetData = props.setGetData;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0 || getData === true) {
      axiosInstance
        .get("bp/get_post_bp_logs/")
        .then((response) => {
          console.log(response);
          if (response.data.length === 0) {
            setData([{ id: null, sys: null, dia: null, pulse: null, note: "" }]);
          } else setData(response.data.reverse());

        })
        .catch((error) => console.log(error));
    }
    return () => {
      setGetData(false);
    };
  }, [data, getData, setGetData]);

  if (data.length > 0) {
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
  } else {
    return null;
  }
}

export default BPHistory;
