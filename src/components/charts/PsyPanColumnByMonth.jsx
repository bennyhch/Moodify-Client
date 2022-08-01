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

const PsycPanColumnByMonth = () => {
  const { dailyEmotionLastYear } = useSelector((store) => store.dailyEmotion);

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

  const defaultValues = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
  };

  const tempPanicObj = dailyEmotionLastYear.reduce((total, item) => {
    const { day, panicAttack } = item;
    total[new Date(day).getMonth()] =
      Number(panicAttack) + (total[new Date(day).getMonth()] || 0);
    return total;
  }, {});
  // console.log("temp panic obj", tempPanicObj);

  const newPanicObj = { ...defaultValues, ...tempPanicObj };
  const panicData = Object.values(newPanicObj).map((el) => ({ value: el }));
  // console.log("panic data", panicData);

  const tempPsyObj = dailyEmotionLastYear.reduce((total, item) => {
    const { day, psychoticSymptoms } = item;
    total[new Date(day).getMonth()] =
      Number(psychoticSymptoms) + (total[new Date(day).getMonth()] || 0);
    return total;
  }, {});
  // console.log("tempPsyObj", tempPsyObj);

  const newPsyObj = { ...defaultValues, ...tempPsyObj };
  const psyData = Object.values(newPsyObj).map((el) => ({ value: el }));
  // console.log("psyData:", psyData);

  const dataset = [
    {
      seriesname: "Psychotic Symptom",
      data: psyData,
    },
    {
      seriesname: "Panic Attack",
      data: panicData,
    },
  ];

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

  return <ReactFC {...chartConfigs} />;
};

export default PsycPanColumnByMonth;
