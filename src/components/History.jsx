import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axiosInstace from "../util/axios";

import HistorySingleLog from "./HistorySingleLog";

function History(props) {
  const getData = props.getData;
  const setGetData = props.setGetData;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0 || getData === true) {
      axiosInstace
        .get("logs/users_logs/")
        .then((response) => {
          console.log(response);
          if (response.data.length === 0) {
            setData([{ id: null, name: null, strength: null, quantity: null }]);
          } else setData(response.data.reverse());
        })
        .catch((error) => console.log(error));
    }
    return () => {
      setGetData(false);
    };
  }, [data, getData, setGetData]);

  return data.length > 0 ? (
    <>
      <h2>Your recent history</h2>
      {data.map((d) => {
        return (
          <Card className="outerHistory-card" key={d.id}>
            <HistorySingleLog historyItem={d} />
          </Card>
        );
      })}
    </>
  ) : null;
}

export default History;
