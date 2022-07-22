import React from "react";
import { useState } from "react";
import styles from "./sliders.module.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "NONE",
  },
  {
    value: 1,
    // label: "MILD",
  },
  {
    value: 2,
    // label: "MODERATE",
  },
  {
    value: 3,
    label: "SERVER",
  },
];

const Sliders = ({ setEmotionsProfile }) => {
  const [value, setValue] = useState(0);

  const sliderHandler = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    // <Box className={styles.sliderContainer}>
    <Slider
      aria-label="Custom marks"
      // defaultValue={value}
      value={value}
      step={1}
      min={0}
      max={3}
      valueLabelDisplay="auto"
      marks={marks}
      onChange={sliderHandler}
      className={styles.slider}
      sx={{ color: "error.main", width: 250, height: 15 }}
    />
    // </Box>
  );
};

export default Sliders;

// const sliderHandler = (e) => {
//   setValue(e.target.value);
// };

/* <div className={styles.slideContainer}>
<input
  type="range"
  min="0"
  max="3"
  // step="1"
  value={value}
  onChange={sliderHandler}
  className={styles.slider}
  list="markers"
/>

<datalist id="markers">
  <option value="0" label="NONE"></option>
  <option value="1" label="MILD"></option>
  <option value="2" label="MODERATE"></option>
  <option value="3" label="SERVER"></option>
</datalist>

<p>
  Value: <span>{value}</span>
</p>
</div> */

// .slideContainer {
//   width: 100px;
// }

// .slider {
//   /* border: 1px solid red; */

//   -webkit-appearance: none;
//   width: 150px;
//   height: 20px;
//   border-radius: 5px;
//   background: #d3d3d3;
//   outline: none;
//   opacity: 0.7;
//   -webkit-transition: .2s;
//   transition: opacity .2s;

//   /* vertical  */
//   /* transform-origin: 75px 75px;
//   transform: rotate(-90deg); */
// }

// .slider:hover {
//   opacity: 1;
// }

// .slider::-webkit-slider-thumb {
//   -webkit-appearance: none;
//   appearance: none;
//   width: 25px;
//   height: 25px;
//   border-radius: 50%;
//   background: #04AA6D;
//   cursor: pointer;
// }

// .slider::-moz-range-thumb {
//   width: 25px;
//   height: 25px;
//   border-radius: 50%;
//   background: #04AA6D;
//   cursor: pointer;
// }

// #markers {
//   display: block;
// }
