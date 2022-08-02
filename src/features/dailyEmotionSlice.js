import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
// time
const today = moment();
const sevenDaysBefore = moment().subtract(7, "days");
const thirtyDaysBefore = moment().subtract(30, "days");
const twelveMonthsBefore = moment().subtract(12, "months");

const initialState = {
  allDailyEmotion: [],
  isDailyLoading: true,
  emotionByDay: [],
  sleepByDay: [],
  dailyEmotionLastWeek: [],
  dailyEmotionLastMonth: [],
  dailyEmotionLastYear: [],
  averageHrsSleepLastWeek: 0,
  dailyCheckIn: false,
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

      state.dailyEmotionLastMonth = state.allDailyEmotion.filter((el) =>
        moment(el.day).isBetween(thirtyDaysBefore, today, null, [])
      );

      state.dailyEmotionLastYear = state.allDailyEmotion.filter((el) =>
        moment(el.day).isBetween(twelveMonthsBefore, today, null, [])
      );

      state.emotionByDay = state.allDailyEmotion.map((el) => {
        const {
          depressionExtreme,
          elevationExtreme,
          irritability,
          restlessness,
          suicidal,
        } = el;
        return [
          moment(el.day).format("M/D/YYYY"),
          depressionExtreme,
          elevationExtreme,
          irritability,
          restlessness,
          suicidal,
        ];
      });
      // console.log("state.emotionByDay", state.emotionByDay);
      state.sleepByDay = state.allDailyEmotion.map((el) => {
        return [moment(el.day).format("M/D/YYYY"), el.hoursOfSleep];
      });

      // average hours of sleep
      const chartData = [];
      for (let i = 0; i < state.dailyEmotionLastWeek.length; i++) {
        chartData.push({
          label: moment(state.dailyEmotionLastWeek[i].day).format("dddd"),
          value: state.dailyEmotionLastWeek[i].hoursOfSleep,
        });
      }
      const totalHrsSleep = chartData.reduce((prev, curr) => {
        return prev + curr.value;
      }, 0);
      state.averageHrsSleepLastWeek = (totalHrsSleep / 7).toFixed(1);

      state.dailyCheckIn = state.allDailyEmotion.some(
        (el) =>
          moment(el.day).format("MMMM Do YYYY") === today.format("MMMM Do YYYY")
      );
    },
  },
});

// export const {} = dailyEmotionSlice.actions;

export default dailyEmotionSlice.reducer;
