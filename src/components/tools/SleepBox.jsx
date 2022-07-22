import { Slider } from "@mui/material";
import React, { useState } from "react";
import { sleepDailyItems } from "../../data/dailyItems";
import { sleepMarks } from "../../data/sliderMarks";

const SleepBox = ({ setEmotionsProfile }) => {
  const { title, hrs } = sleepDailyItems[0];
  const [hours, setHours] = useState(0);

  const sliderHandler = (e) => {
    console.log(hrs);
    setHours(e.target.value);
    console.log(e.target.value);

    setEmotionsProfile((prev) => ({
      ...prev,
      [hrs]: e.target.value,
    }));
  };
  return (
    <>
      <div>
        <p>{title}</p>

        <Slider
          aria-label="Custom marks"
          // defaultValue={value}
          value={hours}
          step={1}
          min={0}
          max={24}
          valueLabelDisplay="auto"
          marks={sleepMarks}
          onChange={sliderHandler}
          sx={{ color: "success.main", width: 250, height: 15 }}
        />
      </div>
    </>
  );
};

export default SleepBox;
