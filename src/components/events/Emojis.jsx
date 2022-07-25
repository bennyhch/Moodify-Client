import React from "react";

const Emojis = (props) => {
  const { id, imageSrc, emojiAlt, emotions, setEventsProfile, eventsProfile } =
    props;

  const clickEmojiHandler = (e) => {
    console.log("value?", e.target.value);

    setEventsProfile((prev) => ({
      ...prev,
      emotions: e.target.value,
    }));
  };
  return (
    <label>
      <input
        type="radio"
        id={id}
        value={emotions}
        onChange={clickEmojiHandler}
        // same name ensure just one btn can be clicked
        name="emoji"
        required
      />
      <img alt={emojiAlt} src={imageSrc} />
    </label>
  );
};

export default Emojis;
