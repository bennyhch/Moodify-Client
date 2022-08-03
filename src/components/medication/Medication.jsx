import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMedication,
  editMed,
  getOneMedication,
} from "../../features/medication/medicationSlice";
import { GoDiffAdded } from "react-icons/go";
import { openMedModal } from "../../features/modal/modalSlice";
import styles from "../docAppointment/docAppointment.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const Medication = ({ setChangeOfItems }) => {
  const dispatch = useDispatch();
  const { medList } = useSelector((store) => store.medication);

  const editHandler = async (medId) => {
    await dispatch(getOneMedication(medId));
    dispatch(editMed());
    dispatch(openMedModal());
  };

  const deleteHandler = async (medId) => {
    await dispatch(deleteMedication(medId));
    setChangeOfItems((prev) => !prev);
  };

  const addHandler = () => {
    dispatch(openMedModal());
  };

  return (
    <section className={`${styles.tableContainer} ${styles.tableContainerMed}`}>
      <header className={`${styles.header} ${styles.headerMed}`}>
        <h4>MEDICATIONS LIST</h4>
        <span>
          <Tooltip title="Add appointment">
            <AddBoxIcon
              onClick={addHandler}
              type="button"
              sx={{ fontSize: 30 }}
            />
          </Tooltip>
        </span>
      </header>
      <table>
        <thead>
          <tr>
            <th className={styles.medName}>Medication Name (Dosage)</th>
            <th className={styles.frequency}>Frequency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medList.map((med) => {
            const { dosage, frequency, medicationName, timeOfDay, units, _id } =
              med;
            return (
              <tr key={_id}>
                <td
                  className={styles.medName}
                >{`${medicationName} (${dosage}${units})`}</td>
                <td
                  className={styles.frequency}
                >{`${frequency}, ${timeOfDay}`}</td>
                <td>
                  <Tooltip title="edit">
                    <IconButton
                      aria-label="edit"
                      onClick={editHandler.bind(null, _id)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="delete">
                    <IconButton
                      aria-label="delete"
                      onClick={deleteHandler.bind(null, _id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {/* <button onClick={editHandler.bind(null, _id)}>
                    <FiEdit />
                  </button>
                  <button onClick={deleteHandler.bind(null, _id)}>
                    <AiFillDelete />
                  </button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <button type="button" onClick={addHandler}>
        <GoDiffAdded />
      </button> */}
    </section>
  );
};

export default Medication;
