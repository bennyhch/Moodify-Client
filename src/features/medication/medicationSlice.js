import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  medList: [],
  isMedLoading: true,
  isMedEditing: false,
  medById: [],
};

export const getMedications = createAsyncThunk(
  "medication/getMedications",
  async (_, thunkAPI) => {
    try {
      const resp = await axios("/medication");
      // console.log("resp.data.medication", resp.data.medication);
      return resp.data.medication;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addMedication = createAsyncThunk(
  "medication/addMedication",
  async (medication, thunkAPI) => {
    const { medicationName, dosage, units, frequency, timeOfDay } = medication;
    try {
      const resp = await axios.post("/medication", {
        medicationName,
        dosage,
        units,
        frequency,
        timeOfDay,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateMedication = createAsyncThunk(
  "medication/updateMedication",
  async (medication, thunkAPI) => {
    const { medId, dosage, frequency, medicationName, timeOfDay, units } =
      medication;
    try {
      const resp = await axios.patch(`/medication/${medId}`, {
        dosage,
        frequency,
        medicationName,
        timeOfDay,
        units,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getOneMedication = createAsyncThunk(
  "medication/getOneMedication",
  async (medId, thunkAPI) => {
    try {
      const resp = await axios(`/medication/${medId}`);
      // console.log("resp.data.medication!", resp.data.medication);
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
  reducers: {
    editMed: (state) => {
      state.isMedEditing = true;
    },
    doneEditMed: (state) => {
      state.isMedEditing = false;
    },
  },
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
    // add one
    [addMedication.fulfilled]: (state, action) => {
      state.isMedLoading = false;
      // close the modal ??
      // make changes to appointmentSlice if free
    },
    // get one
    [getOneMedication.pending]: (state) => {
      state.isMedLoading = true;
    },
    [getOneMedication.fulfilled]: (state, action) => {
      state.isMedLoading = false;
      // console.log("payload", action.payload);
      state.medById = action.payload;
    },
    // update one
    [updateMedication.pending]: (state) => {
      state.isMedLoading = true;
    },
    [updateMedication.fulfilled]: (state, action) => {
      state.isMedEditing = false;
      state.isMedLoading = false;
    },
    [updateMedication.rejected]: (state, action) => {
      state.isMedEditing = false;
      state.isMedLoading = false;
    },
    // delete one
    [deleteMedication.fulfilled]: (state, { payload }) => {
      state.medList = state.medList.filter((el) => el._id !== payload);
    },
  },
});

export const { editMed, doneEditMed } = medicationSlice.actions;

export default medicationSlice.reducer;
