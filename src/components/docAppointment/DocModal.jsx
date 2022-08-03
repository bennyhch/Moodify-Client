import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  doneEditAppointment,
  postAppointment,
  updateAppointmentById,
} from "../../features/docAppointments/appointmentsSlice";
import { closeModal } from "../../features/modal/modalSlice";
import styles from "./docModal.module.css";
import Button from "@mui/material/Button";
import SaveButton from "../tools/SaveButton";

const DocModal = () => {
  const dispatch = useDispatch();

  let initialDate = new Date();
  let initialName = "";
  let initialLocation = "";

  const { isEditing, docAppointmentById } = useSelector(
    (store) => store.docAppointment
  );

  if (isEditing) {
    initialDate = new Date(docAppointmentById.dateOfAppointment);
    initialName = docAppointmentById.doctorName;
    initialLocation = docAppointmentById.location;
  }

  const [date, setDate] = useState(initialDate);
  const [name, setName] = useState(initialName);
  const [location, setLocation] = useState(initialLocation);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await dispatch(
        updateAppointmentById({
          appointmentId: docAppointmentById._id,
          doctorName: name,
          dateOfAppointment: date,
          location,
        })
      );
      dispatch(closeModal());
      return;
    }
    await dispatch(
      postAppointment({
        doctorName: name,
        dateOfAppointment: date,
        location,
      })
    );
    console.log("Sent!");
    dispatch(closeModal());
  };

  const cancelHandler = () => {
    dispatch(doneEditAppointment());
    dispatch(closeModal());
  };

  return (
    <div className={styles.darkBG}>
      <div className={styles.centered}>
        <div className={styles.modal}>
          <form onSubmit={submitHandler}>
            <div className={styles.modalHeader}>
              <h2>{isEditing ? "Edit" : "Add"} Your Appointment</h2>
            </div>
            <div className={styles.modalContent}>
              <label htmlFor="doctorName">Doctor Name</label>
              <input
                className={styles.textField}
                type="text"
                id="doctorName"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />

              {console.log("docAppointmentById:", docAppointmentById)}

              <label htmlFor="location">Location</label>
              <input
                className={styles.textField}
                type="text"
                id="location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                required
                maxLength="15"
              />

              <label htmlFor="dateOfAppointment">Date</label>
              <DateTimePicker
                type="datetime-local"
                id="dateOfAppointment"
                value={date}
                onChange={(e) => {
                  setDate(e);
                }}
              />
            </div>

            <div className={styles.btnContainer}>
              <SaveButton variant="contained" type="submit" sx={{ mr: 2 }}>
                Save
              </SaveButton>
              {/* <Button variant="contained" type="submit" size="small">
                Save Changes
              </Button> */}
              {/* <Button variant="contained" onClick={closeModalHandler}> */}
              <Button variant="contained" onClick={cancelHandler}>
                Cancel
              </Button>
              {/* <button type="submit">Submit</button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocModal;
