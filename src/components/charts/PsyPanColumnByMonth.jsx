import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useSelector } from "react-redux";
import { psyPanCategory } from "../../data/chart";
import { defaultValues } from "../../data/chart";
import styles from "./psyPanColumnByMonth.module.css";
import Header from "../tools/Header";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const PsycPanColumnByMonth = () => {
  const { dailyEmotionLastYear } = useSelector((store) => store.dailyEmotion);

  const categories = [{ category: psyPanCategory }];

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
    // width: "700", // Width of the chart
    // height: "400", // Height of the chart
    width: "100%", // Width of the chart
    height: "50%", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      //Chart Configurations
      chart: {
        theme: "fusion",
        // caption: "Number of Occurence by Month",
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

  return (
    <div className={styles.container}>
      <Header backgroundColor={"#c490bc"}>NUMBER OF OCCURENCE BY MONTH</Header>
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default PsycPanColumnByMonth;
