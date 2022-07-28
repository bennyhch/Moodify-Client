import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  correctAuth: false,
  isLoginLoading: true,
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

      if (!resp.ok) {
        console.log("error resp:", resp);
        throw new Error(`Error! status: ${resp.status}`);
      }
      const result = await resp.json();
      console.log(result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to send info to the DB");
    }
  }
);

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
      state.isLoginLoading = false;
      state.correctAuth = true;
    },
    [postLoginInfo.rejected]: (state, action) => {
      state.isLoginLoading = false;
      state.correctAuth = false;
      console.log("rejected from extra reducers ");
      console.log("from slice, correctauth", state.correctAuth);
    },
  },
});

export const { addUserName, removeUserName } = loginSlice.actions;

export default loginSlice.reducer;
