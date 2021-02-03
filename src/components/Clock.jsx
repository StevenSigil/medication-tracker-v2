import React from "react";

function DateTime(props) {
  setInterval(updateDateTime, 1000);

  const dateTime = props.dateTime;
  const setDateTime = props.setDateTime;
  const getDateTime = props.getDateTime;

  function updateDateTime() {
    const newDateTime = getDateTime();
    setDateTime(newDateTime);
  }

  return (
    <>
      <h4> {dateTime.replace(/-/g, "/")} </h4>
    </>
  );
}

export default DateTime;
