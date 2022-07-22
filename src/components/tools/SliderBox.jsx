import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import styles from "./sliderBox.module.css";
import sliderMarks from "../../data/sliderMarks";

const SliderBox = ({ title, setEmotionsProfile, emotion }) => {
  const [value, setValue] = useState(0);

  const sliderHandler = (e) => {
    console.log(emotion);
    setValue(e.target.value);
    console.log(e.target.value);

    setEmotionsProfile((prev) => ({
      ...prev,
      // [specificEmotion]: value,
      [emotion]: e.target.value,
    }));
  };

  return (
    <>
      <div className={styles.box}>
        <p>{title}</p>
        <Slider
          aria-label="Custom marks"
          // defaultValue={value}
          value={value}
          step={1}
          min={0}
          max={3}
          valueLabelDisplay="auto"
          marks={sliderMarks}
          onChange={sliderHandler}
          sx={{ color: "warning.main", width: 250, height: 15 }}
        />
      </div>
    </>
  );
};

export default SliderBox;
