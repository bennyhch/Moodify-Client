import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const Cards = () => {
  const { dailyEmotionLastWeek } = useSelector((store) => store.dailyEmotion);
  const { dailyCheckIn } = useSelector((store) => store.dailyEmotion);
  const isPsychotic = dailyEmotionLastWeek.some(
    (el) => el.psychoticSymptoms === true
  );
  const isPanic = dailyEmotionLastWeek.some((el) => el.panicAttack === true);

  const details = [
    {
      title: "DID YOU LOG YOUR MOODS TODAY?",
      data: dailyCheckIn,
    },
    {
      title: "ANY PSYCHOTIC SYMPTOMS THE LAST 7 DAYS?",
      data: isPsychotic,
    },
    {
      title: "ANY PANIC ATTACKS THE LAST 7 DAYS?",
      data: isPanic,
    },
  ];
  return (
    <>
      {details.map((detail, index) => {
        return <Card key={index} {...detail} />;
      })}
    </>
  );
};

export default Cards;
