import React from "react";
import { useDispatch } from "react-redux";
import { getAllDailyEmotions } from "../../features/dailyEmotionSlice";
import { getAllEvents } from "../../features/eventSlice";
import EmotionTimeChart from "../../components/charts/EmotionTimeChart";
import SleepByDayBarChart from "../../components/charts/SleepByDayBarChart";
import PsyPanBarChart from "../../components/charts/PsyPanBarChart";
import PsycPanColumnByMonth from "../../components/charts/PsyPanColumnByMonth";
import SleepGauges from "../../components/charts/SleepGauges";
import BipolarBarChart from "../../components/charts/BipolarBarChart";
import styles from "./statistics.module.css";

const Statistics = () => {
  const dispatch = useDispatch();

  dispatch(getAllDailyEmotions());
  dispatch(getAllEvents());

  return (
    <div className={styles.statisticsContainer}>
      <EmotionTimeChart />

      <BipolarBarChart />

      <PsycPanColumnByMonth />
      <PsyPanBarChart />
      <SleepGauges />

      <SleepByDayBarChart />
    </div>
  );
};

export default Statistics;
