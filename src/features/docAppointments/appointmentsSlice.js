import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  docAppointments: [],
  isLoading: true,
  isEditing: false,
  docAppointmentById: [],
};

export const postAppointment = createAsyncThunk(
  "docAppointments/postAppointment",
  async (appointment, thunkAPI) => {
    try {
      const resp = await axios.post("/appointment", {
        doctorName: appointment.doctorName,
        dateOfAppointment: appointment.dateOfAppointment,
        location: appointment.location,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAppointments = createAsyncThunk(
  "docAppointments/getAppointments",
  async (_, thunkAPI) => {
    try {
      const resp = await axios("/appointment");
      console.log("resp.data.appointments:", resp.data.appointments);
      return resp.data.appointments;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAppointmentsById = createAsyncThunk(
  "docAppointments/getAppointmentById",
  async (appointmentId, thunkAPI) => {
    try {
      const resp = await axios.get(`/appointment/${appointmentId}`);
      console.log("res.data", resp.data.appointment);
      return resp.data.appointment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAppointmentById = createAsyncThunk(
  "docAppointments/updateAppointmentById",
  async (appointment, thunkAPI) => {
    try {
      const resp = await axios.patch(
        `/appointment/${appointment.appointmentId}`,
        {
          doctorName: appointment.doctorName,
          dateOfAppointment: appointment.dateOfAppointment,
          location: appointment.location,
        }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "docAppointments/deleteAppointments",
  async (appointmentId, thunkAPI) => {
    try {
      const resp = await axios.delete(`/appointment/${appointmentId}`);
      console.log("DELETE resp.data", resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const docAppointmentsSlices = createSlice({
  name: "docAppointments",
  initialState,
  reducers: {
    editAppointment: (state) => {
      state.isEditing = true;
    },
  },
  extraReducers: {
    //get all
    [getAppointments.pending]: (state) => {
      state.isLoading = true;
    },
    [getAppointments.fulfilled]: (state, action) => {
      console.log("action:", action);
      state.isLoading = false;
      state.docAppointments = action.payload;
    },
    [getAppointments.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // get one appointment by ID
    [getAppointmentsById.pending]: (state) => {
      state.isLoading = true;
    },
    [getAppointmentsById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.docAppointmentById = action.payload;
    },
    [getAppointmentsById.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    //update appointment
    [updateAppointmentById.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAppointmentById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isEditing = false;
      console.log("update action.payload:", action.payload);
    },
    [updateAppointmentById.pending]: (state) => {
      state.isLoading = false;
      state.isEditing = false;
    },
    // create appointment
    [postAppointment.fulfilled]: (state, action) => {
      console.log("action payload POST", action.payload);
    },
    //delete appointment
    [deleteAppointment.fulfilled]: (state, action) => {
      state.docAppointments = state.docAppointments.filter(
        (el) => el._id !== action.payload
      );
      state.isLoading = false;
    },
  },
});

export const { editAppointment } = docAppointmentsSlices.actions;

export default docAppointmentsSlices.reducer;
