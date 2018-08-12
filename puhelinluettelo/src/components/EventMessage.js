import React from "react";

const EventMessage = ({ message }) => {
  if (message === null) {
    return null;
  } else {
    return <div className="eventMessage">{message}</div>;
  }
};

export default EventMessage;
