import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  userName: "",
  correctAuth: false,
  isLoginLoading: true,
  showWarning: false,
  isAccountExisted: false,
};

export const postLoginInfo = createAsyncThunk(
  "login/postLoginInfo",
  async (user, thunkAPI) => {
    try {
      const resp = await fetch(`/${user.endpoint}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
        }),
      });
      const result = await resp.json();
      // console.log(result);
      // if (result.msg === "Account already existed") {
      //   throw new Error(result.msg);
      // }

      if (!resp.ok) {
        throw new Error(result.msg);
      }
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("login/logout", async (_, thunkAPI) => {
  try {
    const resp = await axios("/logout");
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addUserName: (state, { payload }) => {
      state.userName = payload;
    },
    removeUserName: (state, { payload }) => {
      state.userName = "";
    },
  },
  extraReducers: {
    [postLoginInfo.fulfilled]: (state, action) => {
      state.correctAuth = true;
      // console.log("state.correctAuth", state.correctAuth);
      state.isLoginLoading = false;
    },
    [postLoginInfo.rejected]: (state, action) => {
      state.correctAuth = false;
      // console.log("rejected from extra reducers ");
      // console.log("from slice, correctauth", state.correctAuth);
      state.isLoginLoading = false;
      if (action.payload === "Account already existed") {
        state.isAccountExisted = true;
        return;
      }

      // console.log("error msg????", action.payload);
      state.showWarning = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.correctAuth = false;
    },
  },
});

export const { addUserName, removeUserName } = loginSlice.actions;

export default loginSlice.reducer;
