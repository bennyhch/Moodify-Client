import React from "react";
import SleepBarChart from "../../components/charts/SleepBarChart";
import { useDispatch } from "react-redux";
import { getAllDailyEmotions } from "../../features/dailyEmotionSlice";
import EventDoughnutChart from "../../components/charts/EventDoughnutChart";
import { getAllEvents } from "../../features/eventSlice";

const Statistics = () => {
  const dispatch = useDispatch();

  dispatch(getAllDailyEmotions());
  dispatch(getAllEvents());

  return (
    <>
      <SleepBarChart />
      <EventDoughnutChart />
    </>
  );
};

export default Statistics;
