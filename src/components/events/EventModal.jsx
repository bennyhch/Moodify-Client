import React from "react";
import styles from "./eventModal.module.css";
import SaveButton from "../tools/SaveButton";
import Button from "@mui/material/Button";
import Events from "./Events";

const EventModal = () => {
  const cancelHandler = () => {};
  return (
    <div className={styles.darkBG}>
      <div className={styles.centered}>
        <div className={styles.modal}>
          {/* <div className={styles.modalHeader}>
            <h2>How you feeling right now?</h2>
          </div> */}
          <div className={styles.modalContent}>
            <Events />
          </div>
          {/* <div className={styles.btnContainer}>
            <SaveButton variant="contained" type="submit" sx={{ mr: 2 }}>
              Save
            </SaveButton>
            <Button variant="contained" onClick={cancelHandler}>
              Cancel
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
