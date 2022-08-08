import React from "react";
import EventPieChart from "../charts/EventPieChart";
import { Button } from "@mui/material";
import styles from "./journalModal.module.css";
import { useDispatch } from "react-redux";
import { closeJournalModal } from "../../features/modal/modalSlice";
import ModalWrapper from "../tools/ModalWrapper";

const JournalModal = ({ emotionPie }) => {
  const dispatch = useDispatch();
  const cancelHandler = () => {
    dispatch(closeJournalModal());
  };

  return (
    // <div className={styles.darkBG}>
    //   <div className={styles.centered}>
    //     <div className={styles.modal}>
    <ModalWrapper width={"600px"} height={"450px"}>
      <div className={styles.modalHeader}>
        <h2>The Frequency of Emotions</h2>
      </div>
      <div className={styles.modalContent}>
        <EventPieChart emotion={emotionPie} />
      </div>
      <div className={styles.btnContainer}>
        <Button variant="contained" onClick={cancelHandler}>
          Cancel
        </Button>
      </div>
    </ModalWrapper>

    //     </div>
    //   </div>
    // </div>
  );
};

export default JournalModal;
