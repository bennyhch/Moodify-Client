import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Pie3D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useSelector } from "react-redux";

ReactFC.fcRoot(FusionCharts, Pie3D, FusionTheme);

const EventPieChart = ({ emotion }) => {
  const { allEvent } = useSelector((store) => store.event);

  const emotionTotal = allEvent.reduce((total, item) => {
    const { emotions } = item;
    total[emotions] = (total[emotions] || 0) + 1;
    return total;
  }, {});
  // console.log("emotion total from pie chart", emotionTotal);

  const chartData = [];
  for (let key in emotionTotal) {
    chartData.push({
      label: key.toUpperCase(),
      value: emotionTotal[key],
      isSliced: key === emotion ? 1 : 0,
    });
  }

  const chartConfigs = {
    type: "pie3d", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        slicingDistance: "20",
        caption: "The frequency of emotions",
        // subCaption: "In MMbbl = One Million barrels",
        theme: "fusion",
      },
      // Chart Data
      data: chartData,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default EventPieChart;
