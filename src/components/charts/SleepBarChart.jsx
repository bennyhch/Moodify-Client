import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useSelector } from "react-redux";
import moment from "moment";
import styles from "./sleepBarChart.module.css";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const SleepBarChart = () => {
  const { averageHrsSleepLastWeek } = useSelector(
    (store) => store.dailyEmotion
  );
  const { dailyEmotionLastWeek } = useSelector((store) => store.dailyEmotion);

  const chartData = [];
  for (let i = 0; i < dailyEmotionLastWeek.length; i++) {
    chartData.push({
      label: moment(dailyEmotionLastWeek[i].day).format("ddd"),
      value: dailyEmotionLastWeek[i].hoursOfSleep,
    });
  }

  const map = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };

  chartData.sort((a, b) => {
    return map[a.label] - map[b.label];
  });

  const chartConfigs = {
    type: "column2d", // The chart type
    width: "500", // Width of the chart
    height: "350", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        xAxisName: `Average sleep per night: ${averageHrsSleepLastWeek} HOURS`,
        theme: "fusion",
      },
      data: chartData,
    },
  };
  return (
    <div className={styles.barChartContainer}>
      <header>
        <h4>HOURS OF SLEEP PER DAY: THIS WEEK</h4>
      </header>
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default SleepBarChart;
