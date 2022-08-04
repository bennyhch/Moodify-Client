import FusionCharts from "fusioncharts";
import React, { useState, useEffect } from "react";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import sleepSchema from "./sleepSchema";
import { useSelector } from "react-redux";
import Header from "../tools/Header";
import styles from "./sleepByDayBarChart.module.css";

ReactFC.fcRoot(FusionCharts, TimeSeries);
const chart_props = {
  timeseriesDs: {
    type: "timeseries",
    renderAt: "container",
    width: "100%",
    height: "50%",
    dataEmptyMessage: "Fetching data...",
    dataSource: {
      navigator: {
        enabled: false,
      },
      chart: {
        showlegend: 0,
      },
    },
  },
};

const SleepByDayBarChart = () => {
  const { isDailyLoading, sleepByDay } = useSelector(
    (store) => store.dailyEmotion
  );
  const data = JSON.parse(JSON.stringify(sleepByDay));

  const [ds, setds] = useState(chart_props);
  const loadData = () => {
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      data,
      sleepSchema
    );
    const options = { ...ds };
    options.timeseriesDs.dataSource.data = fusionTable;
    setds(options);
  };

  useEffect(() => {
    loadData();
  }, [isDailyLoading]);

  return (
    <div className={styles.container}>
      <Header backgroundColor={"#b9c490"}>HOURS OF SLEEP</Header>
      <ReactFC {...ds.timeseriesDs} />
    </div>
  );
};

export default SleepByDayBarChart;
