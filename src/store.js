import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/login/loginSlice";
import docAppointmentsSlice from "./features/docAppointments/appointmentsSlice";
import modalSlice from "./features/modal/modalSlice";
import medicationSlice from "./features/medication/medicationSlice";
import dailyEmotionSlice from "./features/dailyEmotionSlice";

// modalReducer loginReducer docAppointmentsReducer
export const store = configureStore({
  reducer: {
    login: loginSlice,
    docAppointment: docAppointmentsSlice,
    modal: modalSlice,
    medication: medicationSlice,
    dailyEmotion: dailyEmotionSlice,
  },
});
