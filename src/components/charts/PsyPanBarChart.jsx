import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Bar2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useSelector } from "react-redux";
import styles from "./psyPanicBarChart.module.css";
import Header from "../tools/Header";

ReactFC.fcRoot(FusionCharts, Bar2D, FusionTheme);

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

  const chartConfigs = {
    type: "bar2d", // The chart type
    // width: "700", // Width of the chart
    // height: "400", // Height of the chart
    width: "100%", // Width of the chart
    height: "50%", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        palettecolors: "#7D80C3, #62D1CC",
        labelfontsize: "10px",
        labelDisplay: "rotate",
        // caption: "NUMBER OF OCCURENCE IN THE PAST 30 DAYS",
        // subCaption: "In MMbbl = One Million barrels",
        // xAxisName: "Country",
        // yAxisName: "Reserves (MMbbl)",
        // numberSuffix: "K",
        theme: "fusion",
        showToolTip: "1",
        yAxisMinValue: "0",
        yAxisMaxValue: "31",
      },
      data: chartData,
    },
  };

  return (
    <div className={styles.container}>
      <Header backgroundColor={"#c490bc"}>
        NUMBER OF OCCURENCE IN THE PAST 30 DAYS
      </Header>
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default PsyPanBarChart;
