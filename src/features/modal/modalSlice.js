import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isMedModalOpen: false,
  isJournalModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Doc Appointment Modal
    openModal: (state, action) => {
      state.isModalOpen = true;
    },
    closeModal: (state, action) => {
      state.isModalOpen = false;
    },
    // Med Modal
    openMedModal: (state) => {
      state.isMedModalOpen = true;
    },
    closeMedModal: (state) => {
      state.isMedModalOpen = false;
    },
    // Journal Modal
    openJournalModal: (state) => {
      state.isJournalModalOpen = true;
    },
    closeJournalModal: (state) => {
      state.isJournalModalOpen = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  openMedModal,
  closeMedModal,
  openJournalModal,
  closeJournalModal,
} = modalSlice.actions;

export default modalSlice.reducer;
