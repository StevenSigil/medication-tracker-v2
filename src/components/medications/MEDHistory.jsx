import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

import axiosInstance from "../../util/axios";
import MEDHistorySingleLog from "./MEDHistorySingleLog";

export default function MEDHistory(props) {
  const getData = props.getData;
  const setGetData = props.setGetData;
  const [data, setData] = useState([
    {
      id: null,
      name: null,
      strength: null,
      quantity: null,
      time_taken: new Date(Date().toLocaleString()).toISOString(),
    },
  ]);

  useEffect(() => {
    if (getData === true) {
      axiosInstance.get("logs/users_logs/").then((response) => {
        // console.log(response);
        if (response.data.length === 0) {
          // Catch in-case a user hasn't previously submitted a log instance.
          // setData([{ id: null, name: null, strength: null, quantity: null }]);
          return;
        } else setData(response.data.reverse());
      });
      // .catch((error) => console.log(error));
    }
    return () => {
      setGetData(false);
    };
  }, [getData, setGetData]);

  return (
    <>
      <h2>Your recent history</h2>
      {data.map((d) => {
        return (
          <MEDHistorySingleLog
            key={d.id}
            historyItem={d}
            setGetData={setGetData}
            setGetMedications={props.setGetMedications}
          />
        );
      })}
    </>
  );
}
