import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMedication,
  doneEditMed,
  updateMedication,
} from "../../features/medication/medicationSlice";
import { closeMedModal } from "../../features/modal/modalSlice";
import styles from "./medModal.module.css";
import SaveButton from "../tools/SaveButton";
import { Button } from "@mui/material";
import ModalWrapper from "../tools/ModalWrapper";

const MedModal = () => {
  const dispatch = useDispatch();

  let initialName = "";
  let initialDosage = 0;
  let initialUnits = "";
  let initialFrequency = "As needed";
  let initialTimeOfDay = "Any";

  const { isMedEditing, medById } = useSelector((store) => store.medication);

  if (isMedEditing) {
    initialName = medById.medicationName;
    initialDosage = medById.dosage;
    initialUnits = medById.units;
    initialFrequency = medById.frequency;
    initialTimeOfDay = medById.timeOfDay;
  }

  const [medicationName, setMedicationName] = useState(initialName);
  const [dosage, setDosage] = useState(initialDosage);
  const [units, setUnits] = useState(initialUnits);
  const [frequency, setFrequency] = useState(initialFrequency);
  const [timeOfDay, setTimeOfDay] = useState(initialTimeOfDay);

  const cancelHandler = () => {
    dispatch(doneEditMed());
    dispatch(closeMedModal());
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isMedEditing) {
      await dispatch(
        updateMedication({
          medId: medById._id,
          medicationName,
          dosage,
          units,
          frequency,
          timeOfDay,
        })
      );
      dispatch(closeMedModal());
      return;
    }
    await dispatch(
      addMedication({
        medicationName,
        dosage,
        units,
        frequency,
        timeOfDay,
      })
    );
    dispatch(closeMedModal());
  };

  return (
    // <div className={styles.darkBG}>
    //   <div className={styles.centered}>
    //     <div className={styles.modal}>
    <ModalWrapper height={"515px"} width={"500px"}>
      <form onSubmit={submitHandler} className={styles.formContent}>
        <div className={styles.modalHeader}>
          <h2>{isMedEditing ? "Edit" : "Add"} Your Medication</h2>
        </div>

        <div className={styles.modalContent}>
          <label htmlFor="medicationName">Name</label>
          <input
            className={styles.textField}
            type="text"
            id="medicationName"
            placeholder="Medication Name (e.g., Ritalin)"
            value={medicationName}
            onChange={(e) => setMedicationName(e.target.value)}
          />

          <label htmlFor="dosage">Dosage</label>
          <input
            className={styles.textField}
            type="number"
            step="1"
            min="0"
            id="dosage"
            placeholder="0"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          />

          <label htmlFor="units">Units</label>
          <input
            className={styles.textField}
            type="text"
            placeholder="e.g., mg"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
          />

          <label htmlFor="frequency">Frequency</label>
          <select
            className={styles.textField}
            name="frequency"
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="As needed">As Needed</option>
            <option value="Every day">Every day</option>
          </select>

          <label htmlFor="timeOfDay">Time of day</label>
          <select
            className={styles.textField}
            name="timeOfDay"
            id="timeOfDay"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="AM">AM</option>
            <option value="Mid-day">Mid-day</option>
            <option value="AM &amp; PM">AM &amp; PM</option>
          </select>
        </div>
        <div className={styles.btnContainer}>
          <SaveButton variant="contained" type="submit" sx={{ mr: 2 }}>
            Save
          </SaveButton>
          <Button variant="contained" onClick={cancelHandler}>
            Cancel
          </Button>
          {/* <button type="submit">Submit</button> */}
          {/* <button onClick={cancelHandler}>Cancel</button> */}
        </div>
      </form>
    </ModalWrapper>

    //     </div>
    //   </div>
    // </div>
  );
};

export default MedModal;
