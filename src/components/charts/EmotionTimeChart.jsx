import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import schema from "./schema";
import { useSelector } from "react-redux";
import Header from "../tools/Header";

ReactFC.fcRoot(FusionCharts, TimeSeries);
const chart_props = {
  timeseriesDs: {
    type: "timeseries",
    width: "600",
    height: "750",
    dataEmptyMessage: "Fetching data...",
    chart: {
      labelFontSize: "1px",
    },
    dataSource: {
      navigator: {
        height: 450,
      },
      // caption: { text: "Online Sales of a SuperStore in the US" },
      data: null,
    },
  },
};

const EmotionTimeChart = () => {
  const { isDailyLoading, emotionByDay } = useSelector(
    (store) => store.dailyEmotion
  );
  // console.log("data from the chart", chartData);
  const data = JSON.parse(JSON.stringify(emotionByDay));
  // console.log("data", data);

  const [ds, setds] = useState(chart_props);
  const loadData = () => {
    try {
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const options = { ...ds };
      options.timeseriesDs.dataSource.data = fusionTable;
      setds(options);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [isDailyLoading]);

  return (
    <div>
      <Header backgroundColor={"#90a7c4"}>
        THE FEQUENCY OF EXTREME EMOTIONS
      </Header>
      <ReactFC {...ds.timeseriesDs} />
    </div>
  );
};

export default EmotionTimeChart;
