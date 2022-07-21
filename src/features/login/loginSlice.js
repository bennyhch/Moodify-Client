import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const postLoginInfo = createAsyncThunk(
  "login/postLoginInfo",
  async (user, thunkAPI) => {
    try {
      fetch(`/${user.endpoint}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to send info to the DB");
    }
  }
);

export const { increment } = loginSlice.actions;

export default loginSlice.reducer;
