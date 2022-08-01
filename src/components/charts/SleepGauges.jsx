// STEP 1 - Include Dependencies

// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

//Import the Widgets
import Widgets from "fusioncharts/fusioncharts.widgets";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useSelector } from "react-redux";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const SleepGauges = () => {
  const { averageHrsSleepLastWeek } = useSelector(
    (store) => store.dailyEmotion
  );

  const chartConfigs = {
    type: "angulargauge", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // chart: {
      //   caption: "Average Hours of Sleep",
      //   subcaption: "Last week",
      //   lowerLimit: "0",
      //   upperLimit: "24",
      //   theme: "fusion",
      // },

      // colorRange: colorRange,
      // dials: dials,
      chart: {
        caption: "Average Hours of Sleep",
        subcaption: "Last Week",
        // plotToolText: "Current Score: $value",
        theme: "fusion",
        chartBottomMargin: "100",
        showValue: "1",
      },
      colorRange: {
        color: [
          {
            minValue: "0",
            maxValue: "2",
            code: "#FF0D0D",
          },
          {
            minValue: "2",
            maxValue: "6.5",
            code: "#FF8E15",
          },
          {
            minValue: "6.5",
            maxValue: "9.5",
            code: "#6baa01",
          },
          {
            minValue: "9.5",
            maxValue: "12",
            code: "#FF8E15",
          },
          {
            minValue: "12",
            maxValue: "24",
            code: "#ff0000",
          },
        ],
      },
      dials: {
        dial: [
          {
            value: averageHrsSleepLastWeek,
          },
        ],
      },

      annotations: {
        origw: "550",
        origh: "300",
        autoscale: "1",
        showBelow: "0",
        groups: [
          {
            id: "arcs",
            items: [
              // {
              //   id: "national-cs-bg",
              //   type: "rectangle",
              //   x: "$chartCenterX+2",
              //   y: "$chartEndY - 45",
              //   tox: "$chartCenterX + 130",
              //   toy: "$chartEndY - 25",
              //   fillcolor: "#f8bd19",
              // },
              // {
              //   id: "national-cs-text",
              //   type: "Text",
              //   color: "#ffffff",
              //   label: "National Average : 7.2",
              //   fontSize: "12",
              //   align: "left",
              //   x: "$chartCenterX + 7",
              //   y: "$chartEndY - 35",
              // },
              {
                id: "state-cs-bg",
                type: "rectangle",
                x: "$chartCenterX-2",
                y: "$chartEndY - 45",
                tox: "$chartCenterX - 123",
                toy: "$chartEndY - 25",
                fillcolor: "#6baa01",
              },
              {
                id: "state-cs-text",
                type: "Text",
                color: "#ffffff",
                label: "Sleep needs (adult): 7-9hrs",
                fontSize: "12",
                align: "right",
                x: "$chartCenterX - 10",
                y: "$chartEndY - 35",
              },
              // {
              //   id: "store-cs-bg",
              //   type: "rectangle",
              //   x: "$chartCenterX-130",
              //   y: "$chartEndY - 22",
              //   tox: "$chartCenterX + 150",
              //   toy: "$chartEndY - 2",
              //   fillcolor: "#0075c2",
              // },
              // {
              //   id: "state-cs-text",
              //   type: "Text",
              //   color: "#ffffff",
              //   label: "Store's Customer Satisfaction Range: 6.8 to 9.5",
              //   fontSize: "12",
              //   align: "center",
              //   x: "$chartCenterX + 10",
              //   y: "$chartEndY - 12",
              // },
            ],
          },
        ],
      },
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default SleepGauges;
