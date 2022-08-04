import React from "react";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { toggleMarks } from "../../data/sliderMarks";
import styles from "./sliderBox.module.css";

const ToggleBox = ({ title, toggle, setEmotionsProfile }) => {
  const [value, setValue] = useState(0);

  const sliderHandler = (e) => {
    console.log(toggle);
    setValue(e.target.value);
    console.log(e.target.value);
    let hasSymtpoms = false;
    if (e.target.value === 1) {
      hasSymtpoms = true;
    }

    setEmotionsProfile((prev) => ({
      ...prev,
      [toggle]: hasSymtpoms,
    }));
  };

  return (
    <div className={styles.box}>
      <p>{title}</p>
      <Slider
        aria-label="Custom marks"
        // defaultValue={value}
        value={value}
        step={1}
        min={0}
        max={1}
        // valueLabelDisplay="auto"
        marks={toggleMarks}
        onChange={sliderHandler}
        sx={{ color: "error.main", width: 100, height: 15 }}
      />
    </div>
  );
};

export default ToggleBox;
