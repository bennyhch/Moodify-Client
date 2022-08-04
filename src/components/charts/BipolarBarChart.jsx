import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { useSelector } from "react-redux";
import moment from "moment";
import Header from "../tools/Header";
import styles from "./bipolarBarChart.module.css";
import { category } from "../../data/chart";

charts(FusionCharts);

const BipolarBarChart = () => {
  const { dailyEmotionLastWeek } = useSelector((store) => store.dailyEmotion);
  const maps = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  const elevatedChartData = [];
  for (let i = 0; i < dailyEmotionLastWeek.length; i++) {
    elevatedChartData.push({
      label: moment(dailyEmotionLastWeek[i].day).format("dddd"),
      value: !dailyEmotionLastWeek[i].elevationExtreme
        ? dailyEmotionLastWeek[i].elevationExtreme + 0.1
        : dailyEmotionLastWeek[i].elevationExtreme,
    });
  }
  const depressedChartData = [];
  for (let i = 0; i < dailyEmotionLastWeek.length; i++) {
    depressedChartData.push({
      label: moment(dailyEmotionLastWeek[i].day).format("dddd"),
      value: -Math.abs(
        !dailyEmotionLastWeek[i].depressionExtreme
          ? dailyEmotionLastWeek[i].depressionExtreme + 0.1
          : dailyEmotionLastWeek[i].depressionExtreme
      ),
    });
  }

  depressedChartData.sort((a, b) => {
    return maps[a.label] - maps[b.label];
  });

  elevatedChartData.sort((a, b) => {
    return maps[a.label] - maps[b.label];
  });

  const dataSource = {
    chart: {
      // caption: "DEPRESSED AND ELEVATED MOODS: THIS WEEK",
      palettecolors: "#c58f8f,#8f96c5;",
      // yaxisname: "Revenue",
      // subcaption: "(On GAAP basis)",
      // numberprefix: "$",
      yaxismaxvalue: "3",
      yaxisminvalue: "-3",
      // showsum: "1",
      plottooltext:
        "$seriesName on $label was <b>Server $dataValue</b>  ($percentValue of monthly total)",
      decimals: "1",
      theme: "fusion",
    },

    categories: [{ category }],
    dataset: [
      {
        seriesname: "ELEVATED",
        data: elevatedChartData,
      },
      {
        seriesname: "DEPRESSED",
        data: depressedChartData,
      },
    ],
  };
  return (
    <div className={styles.bipolarContainer}>
      <Header backgroundColor={"#c0c490"}>
        DEPRESSED AND ELEVATED MOODS: THIS WEEK
      </Header>
      <ReactFusioncharts
        type="stackedcolumn2d"
        width="100%"
        height="50%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    </div>
  );
};

export default BipolarBarChart;
