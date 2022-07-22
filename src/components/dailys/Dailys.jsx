import React, { useState } from "react";
import SliderBox from "../tools/SliderBox";
import dailyItems from "../../data/dailyItems";
import { toggleDailyItems } from "../../data/dailyItems";
import ToggleBox from "../tools/ToggleBox";
import SleepBox from "../tools/SleepBox";

const Dailys = () => {
  const [emotionsProfile, setEmotionsProfile] = useState({
    depressionExtreme: 0,
    elevationExtreme: 0,
    anxietyExtreme: 0,
    restlessness: 0,
    irritability: 0,
    suicidal: 0,
    psychoticSymptoms: false,
    panicAttack: false,
    hoursOfSleep: 0,
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
      psychoticSymptoms,
      panicAttack,
      hoursOfSleep,
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
          psychoticSymptoms,
          panicAttack,
          hoursOfSleep,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <>
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
      </>
      <>
        {toggleDailyItems.map((toggleItem) => {
          const { id, title, toggle } = toggleItem;
          return (
            <ToggleBox
              key={id}
              title={title}
              toggle={toggle}
              setEmotionsProfile={setEmotionsProfile}
            />
          );
        })}
      </>
      <>
        <SleepBox setEmotionsProfile={setEmotionsProfile} />
      </>
      <button type="sumbit">Submit</button>
    </form>
  );
};

export default Dailys;
