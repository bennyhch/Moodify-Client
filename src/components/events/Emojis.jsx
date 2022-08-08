import { Tooltip } from "@mui/material";
import React from "react";

const Emojis = (props) => {
  const { id, imageSrc, emojiAlt, emotions, setEventsProfile, eventsProfile } =
    props;

  const clickEmojiHandler = (e) => {
    // console.log("value?", e.target.value);
    // console.log(eventsProfile, "eventsProfile[emotions]");

    setEventsProfile((prev) => ({
      ...prev,
      emotions: e.target.title,
    }));
  };
  return (
    <label>
      <input
        type="radio"
        id={id}
        title={emotions}
        // value={emotions}
        value={eventsProfile[emotions]}
        onClick={clickEmojiHandler}
        // same name ensure just one btn can be clicked
        name="emoji"
        required
      />
      <Tooltip title={emotions.toUpperCase()}>
        <img alt={emojiAlt} src={imageSrc} />
      </Tooltip>
    </label>
  );
};

export default Emojis;
