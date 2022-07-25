import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import styles from "./events.module.css";
import Emojis from "./Emojis";
import emojiItems from "../../data/emojiItems";
import DateTimePicker from "react-datetime-picker";
import eventDetailsItems from "../../data/eventDetailsItems";
import EventDetails from "./EventDetails";

const Events = () => {
  const initialState = {
    emotions: "",
    incident: "",
    thought: "",
    behavior: "",
    timeOfEvent: new Date(),
  };
  const [eventsProfile, setEventsProfile] = useState(initialState);

  const dateTimeHandler = (newValue) => {
    console.log(newValue);
    setEventsProfile((prev) => ({
      ...prev,
      timeOfEvent: newValue,
    }));
  };

  const submitEventHandler = async (e) => {
    e.preventDefault();
    const { emotions, thought, behavior, timeOfEvent, incident } =
      eventsProfile;
    try {
      await fetch("/event", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          emotions,
          thought,
          behavior,
          timeOfEvent,
          incident,
        }),
      });
      console.log("eventsProfile", eventsProfile);
      setEventsProfile(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitEventHandler}>
      <h1>How you feeling right now?</h1>
      <div className={styles.emojiContainer}>
        {emojiItems.map((emojiItem) => {
          return (
            <Emojis
              key={emojiItem.id}
              {...emojiItem}
              setEventsProfile={setEventsProfile}
              eventsProfile={eventsProfile}
            />
          );
        })}
      </div>

      <div>
        {eventDetailsItems.map((eventDetailsItem) => {
          return (
            <EventDetails
              key={eventDetailsItem.id}
              {...eventDetailsItem}
              setEventsProfile={setEventsProfile}
              eventsProfile={eventsProfile}
            />
          );
        })}
      </div>

      <DateTimePicker
        onChange={dateTimeHandler}
        value={eventsProfile.timeOfEvent}
      />

      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default Events;

// const incidentHandler = (e) => {
//   setEventsProfile((prev) => ({
//     ...prev,
//     incident: e.target.value,
//   }));
// };

// const thoughtHandler = (e) => {
//   setEventsProfile((prev) => ({
//     ...prev,
//     thought: e.target.value,
//   }));
// };

// const behaviorHandler = (e) => {
//   setEventsProfile((prev) => ({
//     ...prev,
//     behavior: e.target.value,
//   }));
// };

/* <label htmlFor="incident">Triggering Event?</label>
      <input
        type="text"
        id="incident"
        placeholder="e.g., My app has too many bugs..."
        required
        onChange={incidentHandler}
      />

      <label htmlFor="thought">What's on your mind?</label>
      <input
        type="text"
        id="thought"
        placeholder="e.g., I'm such a loser..."
        required
        onChange={thoughtHandler}
      />

      <label htmlFor="behavior">How did you react to it?</label>
      <input
        type="text"
        id="behavior"
        placeholder="e.g., I cried..."
        required
        onChange={behaviorHandler}
      /> */

/* <label htmlFor="happy">
          <input
            type="radio"
            id="happy"
            value="happy"
            onChange={clickEmojiHandler}
          />
          <img src={happy} alt="happy" />
        </label>

        <label htmlFor="sad">
          <input
            type="radio"
            id="sad"
            value="sad"
            onChange={clickEmojiHandler}
          />
          <img src={sad} alt="sad" />
        </label>

        <label htmlFor="angry">
          <input
            type="radio"
            id="angry"
            value="angry"
            onChange={clickEmojiHandler}
          />
          <img src={angry} alt="angry" />
        </label>

        <label htmlFor="love">
          <input
            type="radio"
            id="love"
            value="love"
            onChange={clickEmojiHandler}
          />
          <img src={love} alt="love" />
        </label>

        <label htmlFor="anxious">
          <input
            type="radio"
            id="anxious"
            value="anxious"
            onChange={clickEmojiHandler}
          />
          <img src={anxious} alt="anxious" />
        </label> */
