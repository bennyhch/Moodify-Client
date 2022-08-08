import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EmotionTimeChart from "../../components/charts/EmotionTimeChart";
import Dailys from "../../components/dailys/Dailys";
import DailysModal from "../../components/dailys/DailysModal";
import { getAllDailyEmotions } from "../../features/dailyEmotionSlice";
import styles from "./logger.module.css";

// import EmotionTimeChartStat from "../../components/charts/EmotionTimeChartStat";

const Logger = () => {
  const { isSaveLoggerModalOpen } = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  dispatch(getAllDailyEmotions());

  return (
    <div className={styles.loggerContainer}>
      {isSaveLoggerModalOpen && <DailysModal />}

      <EmotionTimeChart />
      {/* <EmotionTimeChartStat /> */}
      <Dailys />
    </div>
  );
};

export default Logger;
