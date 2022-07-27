import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  medList: [],
  isMedLoading: true,
};

export const getMedications = createAsyncThunk(
  "medication/getMedications",
  async (_, thunkAPI) => {
    try {
      const resp = await axios("/medication");
      console.log("resp.data.medication", resp.data.medication);
      return resp.data.medication;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteMedication = createAsyncThunk(
  "medication/deleteMedication",
  async (medId, thunkAPI) => {
    try {
      const resp = await axios.delete(`/medication/${medId}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const medicationSlice = createSlice({
  name: "medication",
  initialState,
  reducers: {},
  extraReducers: {
    //get all
    [getMedications.pending]: (state) => {
      state.isMedLoading = true;
    },
    [getMedications.fulfilled]: (state, action) => {
      state.isMedLoading = false;
      state.medList = action.payload;
    },
    [getMedications.rejected]: (state, action) => {
      state.isMedLoading = false;
      state.error = action.payload;
    },
    // delete one
    [deleteMedication.fulfilled]: (state, { payload }) => {
      state.medList = state.medList.filter((el) => el._id !== payload);
    },
  },
});

export default medicationSlice.reducer;
