import React, { useState } from "react";

const EventDetails = (props) => {
  const { id, placeholder, question, setEventsProfile, eventsProfile } = props;
  const changeHandler = (e) => {
    console.log("e value", e.target.value);
    console.log("id:", id);
    console.log(eventsProfile);
    setEventsProfile((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor={id}>{question}</label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        required
        onChange={changeHandler}
        value={eventsProfile[id]}
      />
    </>
  );
};

export default EventDetails;
