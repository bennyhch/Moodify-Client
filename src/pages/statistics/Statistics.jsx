import React from "react";
import SleepBarChart from "../../components/charts/SleepBarChart";
import { useDispatch } from "react-redux";
import { getAllDailyEmotions } from "../../features/dailyEmotionSlice";

const Statistics = () => {
  const dispatch = useDispatch();

  dispatch(getAllDailyEmotions());
  return (
    <>
      <SleepBarChart />
    </>
  );
};

export default Statistics;
