import React from "react";
import styles from "./eventModal.module.css";
import Events from "./Events";

const EventModal = () => {
  return (
    <div className={styles.darkBG}>
      <div className={styles.centered}>
        <div className={styles.modal}>
          <Events />
        </div>
      </div>
    </div>
  );
};

export default EventModal;
