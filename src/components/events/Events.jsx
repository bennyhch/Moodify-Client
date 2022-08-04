import React, { useState } from "react";
import styles from "./events.module.css";
import Emojis from "./Emojis";
import emojiItems from "../../data/emojiItems";
import DateTimePicker from "react-datetime-picker";
import eventDetailsItems from "../../data/eventDetailsItems";
import EventDetails from "./EventDetails";
import SaveButton from "../tools/SaveButton";
import { useDispatch } from "react-redux";
import { closeAddEntryModal } from "../../features/modal/modalSlice";

const Events = () => {
  const dispatch = useDispatch();
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
      setEventsProfile(initialState);
      console.log("eventsProfil2", eventsProfile);
    } catch (error) {
      console.log(error);
    }
    dispatch(closeAddEntryModal());
  };

  const cancelHandler = () => {
    dispatch(closeAddEntryModal());
  };

  return (
    <form onSubmit={submitEventHandler} className={styles.formContainer}>
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

      <div className={styles.inputFieldContainer}>
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

      <div className={styles.bottomRow}>
        <div>
          <DateTimePicker
            onChange={dateTimeHandler}
            value={eventsProfile.timeOfEvent}
          />
        </div>
        <div className={styles.btnContainer}>
          <SaveButton
            variant="contained"
            onClick={cancelHandler}
            sx={{ mr: 2 }}
          >
            Back
          </SaveButton>
          <SaveButton variant="contained" type="submit">
            Save
          </SaveButton>
        </div>
      </div>
    </form>
  );
};

export default Events;
