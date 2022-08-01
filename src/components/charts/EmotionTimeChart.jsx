import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import schema from "./schema";
import { useSelector } from "react-redux";

ReactFC.fcRoot(FusionCharts, TimeSeries);
const chart_props = {
  timeseriesDs: {
    type: "timeseries",
    width: "600",
    height: "800",
    dataEmptyMessage: "Fetching data...",
    dataSource: {
      navigator: {
        height: 500,
      },
      caption: { text: "Online Sales of a SuperStore in the US" },
      data: null,
      yAxis: [
        {
          plot: [
            {
              value: "Sales ($)",
            },
          ],
        },
      ],

      // xAxis: {
      //   initialInterval: {
      //     from: "2016-01-01 12:00:00",
      //     to: "2016-01-31 12:00:00"
      //   }
      // }
      // https://www.fusioncharts.com/dev/fusiontime/fusiontime-attributes
    },
  },
};

const ChartViewer = () => {
  // const chartData = useSelector((store) => store.dailyEmotion.depressionByDay);
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
      <ReactFC {...ds.timeseriesDs} />
    </div>
  );
};

export default ChartViewer;
