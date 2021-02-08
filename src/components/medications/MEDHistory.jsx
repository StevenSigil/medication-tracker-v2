import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

import axiosInstance from "../../util/axios";
import MEDHistorySingleLog from "./MEDHistorySingleLog";

function MEDHistory(props) {
  const getData = props.getData;
  const setGetData = props.setGetData;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0 || getData === true) {
      axiosInstance
        .get("logs/users_logs/")
        .then((response) => {
          console.log(response);
          if (response.data.length === 0) {
            // Catch incase a user hasn't previously submitted a log instance.
            setData([{ id: null, name: null, strength: null, quantity: null }]);
          } else setData(response.data.reverse());
        })
        .catch((error) => console.log(error));
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
            <MEDHistorySingleLog historyItem={d} />
          </Card>
        );
      })}
    </>
  );
}

export default MEDHistory;
