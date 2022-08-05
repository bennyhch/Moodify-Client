import React from "react";
import { useDispatch } from "react-redux";
import EmotionTimeChart from "../../components/charts/EmotionTimeChart";
import Dailys from "../../components/dailys/Dailys";
import { getAllDailyEmotions } from "../../features/dailyEmotionSlice";
import styles from "./logger.module.css";
// import EmotionTimeChartStat from "../../components/charts/EmotionTimeChartStat";

const Logger = () => {
  const dispatch = useDispatch();

  dispatch(getAllDailyEmotions());

  return (
    <div className={styles.loggerContainer}>
      <EmotionTimeChart />
      {/* <EmotionTimeChartStat /> */}

      <Dailys />
    </div>
  );
};

export default Logger;
