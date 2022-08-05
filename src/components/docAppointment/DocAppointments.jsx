import React from "react";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deleteAppointment,
  editAppointment,
  getAppointmentsById,
} from "../../features/docAppointments/appointmentsSlice";
import { openModal } from "../../features/modal/modalSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import styles from "./docAppointment.module.css";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

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

  const deleteHandler = async (appointmentId) => {
    await dispatch(deleteAppointment(appointmentId));
    setChangeOfItems((prev) => !prev);
  };

  const addHandler = () => {
    dispatch(openModal());
  };
  if (isLoading) {
    return (
      <div>
        <h1>APPOINTMENT Loading ...</h1>
      </div>
    );
  }

  return (
    <section className={`${styles.tableContainer} ${styles.tableContainerDoc}`}>
      <header className={`${styles.header} ${styles.headerDoc}`}>
        {/* <h4>BOOKED APPOINTMENTS</h4>
        <span>
          <Tooltip title="Add appointment">
            <AddBoxIcon
              onClick={addHandler}
              type="button"
              sx={{ fontSize: 30 }}
            />
          </Tooltip>
        </span> */}

        <ul>
          <li>
            <Tooltip title="Add appointment">
              <AddBoxIcon
                onClick={addHandler}
                type="button"
                sx={{ fontSize: 30 }}
              />
            </Tooltip>
          </li>
          <li>
            <h4>BOOKED APPOINTMENTS</h4>
          </li>
          <li>
            <Tooltip title="Add appointment">
              <AddBoxIcon
                onClick={addHandler}
                type="button"
                sx={{ fontSize: 30 }}
                className={styles.addIcon}
              />
            </Tooltip>
          </li>
        </ul>
      </header>
      <table>
        <thead>
          <tr>
            <th className={styles.number}>#</th>
            <th>Doctor Name</th>
            <th>Date</th>
            <th className={styles.location}>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        {docAppointments.length < 1 ? (
          <tbody>
            <tr>
              <td className={styles.emptyList}>
                <h4>You have no upcoming doc appointment ...</h4>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {docAppointments.map((docAppointment, index) => {
              const { doctorName, dateOfAppointment, location, _id } =
                docAppointment;
              return (
                <tr key={_id}>
                  <td className={styles.number}>{index + 1}</td>
                  <td>{doctorName}</td>
                  <td>{moment(dateOfAppointment).format("M-D-YY; H:mm")}</td>
                  <td className={styles.location}>{location}</td>
                  <td>
                    <Tooltip title="edit">
                      <IconButton
                        aria-label="edit"
                        onClick={editHandler.bind(null, _id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {/* <button type="button" onClick={editHandler.bind(null, _id)}>
                    <FiEdit />
                  </button> */}
                    <Tooltip title="delete">
                      <IconButton
                        aria-label="delete"
                        onClick={deleteHandler.bind(null, _id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {/* <button type="button" onClick={deleteHandler.bind(null, _id)}>
                    <AiFillDelete />
                  </button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>

      {/* <button type="button" onClick={addHandler}>

        <AiOutlineFileAdd />
      </button> */}
    </section>
  );
};

export default DocAppointments;
