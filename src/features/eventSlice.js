import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
// time
const today = moment();
const sevenDaysBefore = moment().subtract(7, "days");
console.log("today", today);
console.log("7 days before", sevenDaysBefore);
console.log("in between", today.isBetween(sevenDaysBefore, today, null, []));

const initialState = {
  allEvent: [],
  isEventLoading: true,
  eventEmotionLastWeek: [],
};

export const getAllEvents = createAsyncThunk(
  "event/getAllEvents",
  async (_, thunkAPI) => {
    try {
      const resp = await axios("/event");
      console.log("resp.data.events", resp.data.events);
      return resp.data.events;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllEvents.fulfilled]: (state, action) => {
      state.isEventLoading = false;
      state.allEvent = action.payload;
      state.eventEmotionLastWeek = state.allEvent.filter((el) =>
        moment(el.timeOfEvent).isBetween(sevenDaysBefore, today, null, [])
      );
      console.log("last week ", state.eventEmotionLastWeek);
    },
  },
});

export default eventSlice.reducer;
