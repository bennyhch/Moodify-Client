import React from "react";
import SleepBarChart from "../../components/charts/SleepBarChart";
import { useDispatch } from "react-redux";
import { getAllDailyEmotions } from "../../features/dailyEmotionSlice";
import EventDoughnutChart from "../../components/charts/EventDoughnutChart";
import { getAllEvents } from "../../features/eventSlice";
import ChartViewer from "../../components/charts/EmotionTimeChart";
import SleepByDayBarChart from "../../components/charts/SleepByDayBarChart";
import PsyPanBarChart from "../../components/charts/PsyPanBarChart";
import PsycPanColumnByMonth from "../../components/charts/PsyPanColumnByMonth";
import SleepGauges from "../../components/charts/SleepGauges";
import BipolarBarChart from "../../components/charts/BipolarBarChart";

const Statistics = () => {
  const dispatch = useDispatch();

  dispatch(getAllDailyEmotions());
  dispatch(getAllEvents());

  return (
    <>
      <BipolarBarChart />
      <SleepGauges />
      <PsycPanColumnByMonth />
      <PsyPanBarChart />
      {/* <SleepByDayBarChart /> */}
      <ChartViewer />
      <SleepBarChart />
      {/* <EventDoughnutChart /> */}
    </>
  );
};

export default Statistics;
