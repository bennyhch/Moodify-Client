import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isMedModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
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
  },
});

export const { openModal, closeModal, openMedModal, closeMedModal } =
  modalSlice.actions;

export default modalSlice.reducer;
