import React from "react";
import { useEffect, useState } from "react";
import DocAppointments from "../../components/docAppointment/DocAppointments";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../features/docAppointments/appointmentsSlice";
import DocModal from "../../components/docAppointment/DocModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, docAppointments } = useSelector(
    (store) => store.docAppointment
  );
  const { isModalOpen } = useSelector((store) => store.modal);
  const [changeOfItems, setChangeOfItems] = useState(false);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch, changeOfItems, isModalOpen]);

  if (isLoading) {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }

  if (docAppointments.length < 1) {
    return (
      <section>
        <header>
          <h2>You currently have no upcoming doctor appointment</h2>
        </header>
      </section>
    );
  }

  return (
    <>
      {isModalOpen && <DocModal />}
      <DocAppointments setChangeOfItems={setChangeOfItems} />
    </>
  );
};

export default Dashboard;
