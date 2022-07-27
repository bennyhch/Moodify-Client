import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deleteAppointment,
  editAppointment,
  getAppointmentsById,
} from "../../features/docAppointments/appointmentsSlice";
import { openModal } from "../../features/modal/modalSlice";
import { GoDiffAdded } from "react-icons/go";

const DocAppointments = ({ setChangeOfItems }) => {
  const dispatch = useDispatch();
  const { docAppointments, isLoading } = useSelector(
    (store) => store.docAppointment
  );

  const editHandler = async (appointmentId) => {
    await dispatch(getAppointmentsById(appointmentId));
    dispatch(editAppointment());
    dispatch(openModal());
  };

  const addHandler = () => {
    dispatch(openModal());
  };

  const deleteHandler = async (appointmentId) => {
    await dispatch(deleteAppointment(appointmentId));
    setChangeOfItems((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div>
        <h1>APPOINTMENT Loading ...</h1>
      </div>
    );
  }

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {docAppointments.map((docAppointment, index) => {
            const { doctorName, dateOfAppointment, location, _id } =
              docAppointment;
            return (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>{doctorName}</td>
                <td>
                  {moment(dateOfAppointment).format("MMMM Do YYYY, h:mm a")}
                </td>
                <td>{location}</td>
                <td>
                  <button type="button" onClick={editHandler.bind(null, _id)}>
                    <FiEdit />
                  </button>
                  <button type="button" onClick={deleteHandler.bind(null, _id)}>
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="button" onClick={addHandler}>
        <GoDiffAdded />
      </button>
    </section>
  );
};

export default DocAppointments;
