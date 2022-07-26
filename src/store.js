import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/login/loginSlice";
import docAppointmentsSlice from "./features/docAppointments/appointmentsSlice";
import modalSlice from "./features/modal/modalSlice";

// modalReducer loginReducer docAppointmentsReducer
export const store = configureStore({
  reducer: {
    login: loginSlice,
    docAppointment: docAppointmentsSlice,
    modal: modalSlice,
  },
});
