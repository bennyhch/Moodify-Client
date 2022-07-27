import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteMedication } from "../../features/medication/medicationSlice";
import { GoDiffAdded } from "react-icons/go";
import { openMedModal } from "../../features/modal/modalSlice";

const Medication = ({ setChangeOfItems }) => {
  const dispatch = useDispatch();
  const { medList } = useSelector((store) => store.medication);

  const deleteHandler = async (medId) => {
    await dispatch(deleteMedication(medId));
    setChangeOfItems((prev) => !prev);
  };

  const addHandler = () => {
    dispatch(openMedModal());
  };

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Medication Name (Dosage)</th>
            <th>Frequency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medList.map((med) => {
            const { dosage, frequency, medicationName, timeOfDay, units, _id } =
              med;
            return (
              <tr key={_id}>
                <td>{`${medicationName} (${dosage}${units})`}</td>
                <td>{`${frequency}, ${timeOfDay}`}</td>
                <td>
                  <button>
                    <FiEdit />
                  </button>
                  <button onClick={deleteHandler.bind(null, _id)}>
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

export default Medication;
