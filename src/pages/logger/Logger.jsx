import React from "react";
import Dailys from "../../components/dailys/Dailys";
import Events from "../../components/events/Events";
import styles from "./logger.module.css";

const Logger = () => {
  return (
    <div className={styles.loggerContainer}>
      <Events />
      <Dailys />
    </div>
  );
};

export default Logger;
