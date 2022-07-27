import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMedication,
  doneEditMed,
  updateMedication,
} from "../../features/medication/medicationSlice";
import { closeMedModal } from "../../features/modal/modalSlice";

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
    <form onSubmit={submitHandler}>
      <h2>{isMedEditing ? "Edit" : "Add"} Your Medication</h2>

      <label htmlFor="medicationName">Name</label>
      <input
        type="text"
        id="medicationName"
        placeholder="Medication Name (e.g., Ritalin)"
        value={medicationName}
        onChange={(e) => setMedicationName(e.target.value)}
      />

      <label htmlFor="dosage">Dosage</label>
      <input
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
        type="text"
        placeholder="mg"
        value={units}
        onChange={(e) => setUnits(e.target.value)}
      />

      <label htmlFor="frequency">Frequency</label>
      <select
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

      <button type="submit">Submit</button>
      <button onClick={cancelHandler}>Cancel</button>
    </form>
  );
};

export default MedModal;
