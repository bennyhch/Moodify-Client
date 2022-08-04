import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import schema from "./schema";
import { useSelector } from "react-redux";
import styles from "./emotionTimeChartStat.module.css";
import Header from "../tools/Header";

ReactFC.fcRoot(FusionCharts, TimeSeries);
const chart_props = {
  timeseriesDs: {
    type: "timeseries",
    width: "100%",
    height: "100%",
    dataEmptyMessage: "Fetching data...",
    chart: {
      labelFontSize: "1px",
    },
    dataSource: {
      navigator: {
        height: 450,
      },
      data: null,
    },
  },
};

const EmotionTimeChartStat = () => {
  const { isDailyLoading, emotionByDay } = useSelector(
    (store) => store.dailyEmotion
  );
  const data = JSON.parse(JSON.stringify(emotionByDay));

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
    <div className={styles.container}>
      <Header backgroundColor={"#90a7c4"}>
        THE FEQUENCY OF EXTREME EMOTIONS
      </Header>
      <ReactFC {...ds.timeseriesDs} />
    </div>
  );
};

export default EmotionTimeChartStat;
