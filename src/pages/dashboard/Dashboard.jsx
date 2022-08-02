import React from "react";
import { useEffect, useState } from "react";
import DocAppointments from "../../components/docAppointment/DocAppointments";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../features/docAppointments/appointmentsSlice";
import DocModal from "../../components/docAppointment/DocModal";
import Medication from "../../components/medication/Medication";
import { getMedications } from "../../features/medication/medicationSlice";
import MedModal from "../../components/medication/MedModal";
import SleepBarChart from "../../components/charts/SleepBarChart";
import { getAllDailyEmotions } from "../../features/dailyEmotionSlice";
import { getAllEvents } from "../../features/eventSlice";
import EventDoughnutChart from "../../components/charts/EventDoughnutChart";
import Cards from "../../components/cards/Cards";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, docAppointments } = useSelector(
    (store) => store.docAppointment
  );
  const { isModalOpen, isMedModalOpen } = useSelector((store) => store.modal);

  const [changeOfItems, setChangeOfItems] = useState(false);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch, changeOfItems, isModalOpen]);

  useEffect(() => {
    dispatch(getMedications());
  }, [dispatch, changeOfItems, isMedModalOpen]);

  useEffect(() => {
    dispatch(getAllDailyEmotions());
    dispatch(getAllEvents());
  }, [dispatch]);

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
      <Cards />
      {isModalOpen && <DocModal />}
      <DocAppointments setChangeOfItems={setChangeOfItems} />

      {isMedModalOpen && <MedModal />}
      <Medication setChangeOfItems={setChangeOfItems} />

      {/* <ExampleChart /> */}
      <SleepBarChart />
      <EventDoughnutChart />
    </>
  );
};

export default Dashboard;
