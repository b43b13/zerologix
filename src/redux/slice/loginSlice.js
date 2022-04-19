import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/API";
import { httpClient } from "../../api/httpClient";
import store from "store2";

const initialState = {
  userData: {},
  token: "",
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loginAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginAsync = createAsyncThunk(
  "login",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await API.login(postData);
      const token = data?.auth?.access_token;
      httpClient.defaults.headers.Authorization = `Bearer ${token}`;
      store.session.set("token", token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkUserByToken = createAsyncThunk(
  "checkUserByToken",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await API.checkUserByToken();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "reject";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.auth.access_token;
        state.userData = action.payload;
      })
      .addCase(checkUserByToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserByToken.rejected, (state) => {
        state.status = "reject";
      })
      .addCase(checkUserByToken.fulfilled, (state, action) => {
        state.status = "idle";
        state.userData.profile = action.payload;
      });
  },
});

export const { login } = loginSlice.actions;

export const selectUserData = (state) => state.userData;

export default loginSlice.reducer;
