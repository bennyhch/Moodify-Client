// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Bar2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useSelector } from "react-redux";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Bar2D, FusionTheme);

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

const PsyPanBarChart = () => {
  const { dailyEmotionLastMonth } = useSelector((store) => store.dailyEmotion);
  // console.log("dailyEmotionLastMonth", dailyEmotionLastMonth);

  const numPsyPan = dailyEmotionLastMonth.reduce(
    (total, el) => {
      const { panicAttack, psychoticSymptoms } = el;
      if (psychoticSymptoms === true) {
        total.psychotic += 1;
      }
      if (panicAttack === true) {
        total.panic += 1;
      }
      return total;
    },
    { psychotic: 0, panic: 0 }
  );

  // STEP 2 - Chart Data
  const chartData = [
    {
      label: "Psychotic Symptoms",
      value: numPsyPan.psychotic,
    },
    {
      label: "Panic Attacks",
      value: numPsyPan.panic,
    },
  ];

  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: "bar2d", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "NUMBER OF OCCURENCE IN THE PAST 30 DAYS",
        //Set the chart subcaption
        // subCaption: "In MMbbl = One Million barrels",
        //Set the x-axis name
        // xAxisName: "Country",
        //Set the y-axis name
        yAxisName: "Reserves (MMbbl)",
        // numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion",
      },
      // Chart Data
      data: chartData,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default PsyPanBarChart;
