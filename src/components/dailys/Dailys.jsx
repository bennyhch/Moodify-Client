import React, { useState } from "react";
import SliderBox from "../tools/SliderBox";
import dailyItems from "../../data/dailyItems";
import { useSelector, useDispatch } from "react-redux";
import { postEmotionsProfile } from "../../features/emotionsProfileSlice";

const Dailys = () => {
  const [emotionsProfile, setEmotionsProfile] = useState({
    depressionExtreme: 0,
    elevationExtreme: 0,
    anxietyExtreme: 0,
    restlessness: 0,
    irritability: 0,
    suicidal: 0,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const {
      depressionExtreme,
      elevationExtreme,
      anxietyExtreme,
      restlessness,
      irritability,
      suicidal,
    } = emotionsProfile;
    console.log(emotionsProfile);
    try {
      await fetch("/dailyemotion", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          day: new Date(),
          depressionExtreme,
          elevationExtreme,
          anxietyExtreme,
          restlessness,
          irritability,
          suicidal,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {dailyItems.map((dailyItem) => {
        const { id, title, emotion } = dailyItem;
        return (
          <SliderBox
            key={id}
            title={title}
            emotion={emotion}
            setEmotionsProfile={setEmotionsProfile}
          />
        );
      })}
      <button type="sumbit">Submit</button>
    </form>
  );
};

export default Dailys;
