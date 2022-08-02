import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import styles from "./cards.module.css";

const Cards = () => {
  const { dailyEmotionLastWeek } = useSelector((store) => store.dailyEmotion);
  const { dailyCheckIn } = useSelector((store) => store.dailyEmotion);
  const isPsychotic = dailyEmotionLastWeek.some(
    (el) => el.psychoticSymptoms === true
  );
  const isPanic = dailyEmotionLastWeek.some((el) => el.panicAttack === true);

  const numPsychotic = dailyEmotionLastWeek.reduce((total, cur) => {
    if (cur.psychoticSymptoms) {
      total += 1;
    }
    return total;
  }, 0);

  const numPanic = dailyEmotionLastWeek.reduce((total, cur) => {
    if (cur.panicAttack) {
      total += 1;
    }
    return total;
  }, 0);

  const details = [
    {
      title: "DID YOU LOG YOUR MOODS TODAY?",
      data: dailyCheckIn,
      subheadingPos: "Nice Work!",
      descriptionPos: "Thanks for checking in",
      subheadingNeg: "Oh no!",
      descriptionNeg: "Go to Logger and record your mood!",
      colorHeader: "bgGreen",
    },
    {
      title: "PSYCHOTIC SYMPTOMS THE LAST 7 DAYS?",
      data: isPsychotic,
      subheadingPos: "",
      // descriptionPos: "There's treatment availble to you",
      descriptionPos: `Including today, you've experienced ${numPsychotic} times of psychotic symptoms in the last 7 days`,
      subheadingNeg: "Amazing!",
      descriptionNeg: "Enjoy the rest of your day",
      colorHeader: "bgPurpleBlue",
    },
    {
      title: "PANIC ATTACKS THE LAST 7 DAYS?",
      data: isPanic,
      subheadingPos: "",
      // descriptionPos: "We're here for you",
      descriptionPos: `Includign today, you've experienced ${numPanic} times of panic attack in the last 7 days`,
      subheadingNeg: "Just remeber",
      descriptionNeg: "You're awesome!",
      colorHeader: "bgLightBlue",
    },
  ];
  return (
    <div className={styles.cardContainer}>
      {details.map((detail, index) => {
        return <Card key={index} {...detail} />;
      })}
    </div>
  );
};

export default Cards;
