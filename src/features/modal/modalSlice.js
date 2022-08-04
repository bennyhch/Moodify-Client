import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isMedModalOpen: false,
  isJournalModalOpen: false,
  isAddEntryModalOpen: false,
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
    // adding entry to the journal
    openAddEntryModal: (state) => {
      state.isAddEntryModalOpen = true;
    },
    closeAddEntryModal: (state) => {
      state.isAddEntryModalOpen = false;
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
  openAddEntryModal,
  closeAddEntryModal,
} = modalSlice.actions;

export default modalSlice.reducer;
