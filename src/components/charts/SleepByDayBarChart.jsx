import React, { useState, useEffect } from "react";

import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import sleepSchema from "./sleepSchema";
import { useSelector } from "react-redux";

ReactFC.fcRoot(FusionCharts, TimeSeries);
const chart_props = {
  timeseriesDs: {
    type: "timeseries",
    renderAt: "container",
    width: "600",
    height: "800",
    dataEmptyMessage: "Fetching data...",
    dataSource: {
      navigator: {
        enabled: false,
      },
      chart: {
        showlegend: 0,
      },
      caption: {
        text: "Daily Visitors Count of a Website",
      },
      yaxis: [
        {
          plot: {
            value: "Daily Visitors",
            type: "column",
          },
          format: {
            suffix: "k",
          },
          title: "Daily Visitors Count",
        },
      ],
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
    <div>
      <ReactFC {...ds.timeseriesDs} />
    </div>
  );
};

export default SleepByDayBarChart;
