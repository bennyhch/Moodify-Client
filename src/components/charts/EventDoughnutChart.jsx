import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import { useSelector } from "react-redux";
import styles from "./sleepBarChart.module.css";
ReactFC.fcRoot(FusionCharts, Chart);

const ChartComponent = () => {
  const { eventEmotionLastWeek } = useSelector((store) => store.event);

  const emotionTotal = eventEmotionLastWeek.reduce((total, item) => {
    const { emotions } = item;
    total[emotions] = (total[emotions] || 0) + 1;
    return total;
  }, {});

  const chartData = [];
  for (let key in emotionTotal) {
    chartData.push({
      label: key.toUpperCase(),
      value: emotionTotal[key],
    });
  }

  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "500", // Width of the chart
    height: "350", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        decimals: 0,
        pieRadius: "45%",
        doughnutRadius: "60%",
        // showPercentValues: 0,
        // captionFontColor: "#102a42",
        // captionFontBold: 0,
        // captionFontSize: 20,
        // captionFont: "Roboto",
        // baseFont: "Open Sans",
        // baseFontSize: 16,
        // baseFontColor: "#617d98",
        smartLineColor: "#617d98",
        showShadow: 0,
        showPlotBorder: 0,
        paletteColors:
          "#2caeba, #5D62B5, #FFC533, #F2726F, #8d6e63, #1de9b6, #6E80CA",
        use3DLighting: 0,
        useDataPlotColorForLabels: 0,
        bgColor: "#FFFFFF",
        showBorder: 0,
        them: "fusion",
      },
      data: chartData,
    },
  };

  return (
    <div className={styles.barChartContainer}>
      <header>
        <h4>THE FREQUENCY OF EMOTIONS: THIS WEEK</h4>
      </header>
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default ChartComponent;
