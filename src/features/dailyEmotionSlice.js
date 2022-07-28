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
  allDailyEmotion: [],
  isDailyLoading: true,
  dailyEmotionLastWeek: [],
};

export const getAllDailyEmotions = createAsyncThunk(
  "dailyEmotion/getAllDailyEmotions",
  async (_, thunkAPI) => {
    try {
      const resp = await axios("/dailyemotion");
      console.log("resp.data.dailyEmotions", resp.data.dailyEmotions);
      return resp.data.dailyEmotions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const dailyEmotionSlice = createSlice({
  name: "dailyEmotion",
  initialState,
  reducers: {},
  extraReducers: {
    //get all
    [getAllDailyEmotions.fulfilled]: (state, action) => {
      state.isDailyLoading = false;
      state.allDailyEmotion = action.payload;
      state.dailyEmotionLastWeek = state.allDailyEmotion.filter((el) =>
        moment(el.day).isBetween(sevenDaysBefore, today, null, [])
      );
      // state.allDailyEmotion.filter((el) => console.log(moment(el.day)));
      console.log(state.dailyEmotionLastWeek);
    },
  },
});

// export const {} = dailyEmotionSlice.actions;

export default dailyEmotionSlice.reducer;
