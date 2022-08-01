// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useSelector } from "react-redux";
import moment from "moment";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const SleepBarChart = () => {
  const { averageHrsSleepLastWeek } = useSelector(
    (store) => store.dailyEmotion
  );
  const { dailyEmotionLastWeek } = useSelector((store) => store.dailyEmotion);

  const chartData = [];
  for (let i = 0; i < dailyEmotionLastWeek.length; i++) {
    chartData.push({
      label: moment(dailyEmotionLastWeek[i].day).format("dddd"),
      value: dailyEmotionLastWeek[i].hoursOfSleep,
    });
  }

  const map = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  chartData.sort((a, b) => {
    return map[a.label] - map[b.label];
  });

  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: "column2d", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "HOURS OF SLEEP PER DAY: THIS WEEK",
        //Set the x-axis name
        xAxisName: `Average sleep per night: ${averageHrsSleepLastWeek} HOURS`,
        //Set the theme for your chart
        theme: "fusion",
      },
      // Chart Data
      data: chartData,
    },
  };
  return (
    <>
      <ReactFC {...chartConfigs} />;
    </>
  );
};

export default SleepBarChart;
