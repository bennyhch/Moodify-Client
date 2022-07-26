import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  postAppointment,
  updateAppointmentById,
} from "../../features/docAppointments/appointmentsSlice";
import { closeModal } from "../../features/modal/modalSlice";

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

  return (
    <form onSubmit={submitHandler}>
      <h2>{isEditing ? "Edit" : "Add"} Your Appointment</h2>

      <label htmlFor="doctorName">Doctor Name</label>
      <input
        type="text"
        id="doctorName"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        required
      />

      {console.log("docAppointmentById:", docAppointmentById)}

      <label htmlFor="dateOfAppointment">Date</label>
      <DateTimePicker
        type="datetime-local"
        id="dateOfAppointment"
        value={date}
        onChange={(e) => {
          setDate(e);
        }}
      />
      {/* <input
        type="datetime-local"
        id="dateOfAppointment"
        value={date}
        onChange={(e) => {
          setDate(e);
        }}
      /> */}

      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default DocModal;
