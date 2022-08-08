import React from "react";
import { useDispatch } from "react-redux";
import { closeSaveLoggerModal } from "../../features/modal/modalSlice";
import ModalWrapper from "../tools/ModalWrapper";
import SaveButton from "../tools/SaveButton";
import styles from "./dailysModal.module.css";
import moment from "moment";
let tmr = moment().add(1, "days").format("MMM Do, YY");

const DailysModal = () => {
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(closeSaveLoggerModal());
  };

  return (
    <ModalWrapper height={"270px"} width={"350px"}>
      <form onSubmit={submitHandler} className={styles.formContent}>
        <h2>Daily Check-In</h2>
        <p>
          Saving today's ({moment().format("MMM Do, YY")}) emotion will prevent
          you from further editing to the logger until {tmr} 00:00am.
        </p>
        <p>
          It'd be fine if you're just logging the previous day's emotions :D
        </p>
        <div className={styles.btnContainer}>
          <SaveButton variant="contained" type="submit" sx={{ ml: 3 }}>
            OK
          </SaveButton>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default DailysModal;
