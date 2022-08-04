import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useSelector } from "react-redux";
import Header from "../tools/Header";
import styles from "./sleepGauges.module.css";

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const SleepGauges = () => {
  const { averageHrsSleepLastWeek } = useSelector(
    (store) => store.dailyEmotion
  );

  const chartConfigs = {
    type: "angulargauge", // The chart type
    width: "100%", // Width of the chart
    height: "50%", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // chart: {
      //   caption: "Average Hours of Sleep",
      //   subcaption: "Last week",
      //   lowerLimit: "0",
      //   upperLimit: "24",
      //   theme: "fusion",
      // },

      // colorRange: colorRange,
      // dials: dials,
      chart: {
        caption: "Sleep Needs (Adults)",
        subcaption: "7 - 9 hrs",
        // plotToolText: "Current Score: $value",
        theme: "fusion",
        chartBottomMargin: "100",
        showValue: "1",
      },
      colorRange: {
        color: [
          {
            minValue: "0",
            maxValue: "6.5",
            code: "#FF0D0D",
          },
          {
            minValue: "6.5",
            maxValue: "9.5",
            code: "#6baa01",
          },
          {
            minValue: "9.5",
            maxValue: "24",
            code: "#ff0000",
          },
        ],
      },
      dials: {
        dial: [{ value: averageHrsSleepLastWeek }],
      },
    },
  };
  return (
    <div className={styles.sleepGaugesContainer}>
      <Header backgroundColor={"#c49090"}>
        AVERAGE HOURS OF SLEEP: LAST WEEK
      </Header>
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default SleepGauges;
