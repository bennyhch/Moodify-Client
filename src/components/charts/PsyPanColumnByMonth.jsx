import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useSelector } from "react-redux";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 2- Define the categories representing the labels on the X-axis
const categories = [
  {
    category: [
      { label: "Jan" },
      { label: "Feb" },
      { label: "Mar" },
      { label: "Apr" },
      { label: "May" },
      { label: "Jun" },
      { label: "Jul" },
      { label: "Aug" },
      { label: "Sep" },
      { label: "Oct" },
      { label: "Nov" },
      { label: "Dec" },
    ],
  },
];
// STEP 3- Construct the dataset comprising multiple series
const dataset = [
  {
    seriesname: "Psychotic Symptom",
    data: [
      { value: "200" },
      { value: "0" },
      { value: "120" },
      { value: "120" },
      { value: "105" },
      { value: "235" },
      { value: "160" },
    ],
  },
  {
    seriesname: "Panic Attack",
    data: [
      { value: "255" },
      { value: "0" },
      { value: "244" },
      { value: "298" },
      { value: "208" },
      { value: "268" },
    ],
  },
];

// STEP 4 - Creating the JSON object to store the chart configurations
const chartConfigs = {
  type: "mscolumn2d", // The chart type
  width: "700", // Width of the chart
  height: "400", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    //Chart Configurations
    chart: {
      theme: "fusion",
      caption: "Number of Occurence by Month",
      xAxisname: "Month",
      // yAxisName: "Revenues (In USD)",
      // numberPrefix: "$",
      plotFillAlpha: "80",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
    },
    categories: categories,
    dataset: dataset,
  },
};

const PsycPanColumnByMonth = () => {
  const { dailyEmotionLastYear } = useSelector((store) => store.dailyEmotion);
  // console.log("daily emotion last year", dailyEmotionLastYear);

  // const arrPsy = new Array({value: });
  dailyEmotionLastYear.forEach((el) => {
    console.log("hey!", new Date(el.day).getMonth());
  });

  const tempObj = dailyEmotionLastYear.reduce((total, item) => {
    const { day, psychoticSymptoms } = item;
    total[new Date(day).getMonth()] =
      Number(psychoticSymptoms) + (total[new Date(day).getMonth()] || 0);
    return total;
  }, {});
  // console.log("tempObj", tempObj);

  // mockData: [
  //   { value: "200" },
  //   { value: "0" },
  //   { value: "120" },
  //   { value: "120" },
  //   { value: "105" },
  //   { value: "235" },
  //   { value: "160" },
  // ],

  return <ReactFC {...chartConfigs} />;
};

export default PsycPanColumnByMonth;
