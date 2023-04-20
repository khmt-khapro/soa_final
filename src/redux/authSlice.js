import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  activateAccountRequest,
  signinRequest,
  signupRequest,
} from "./apis/auth.axios";

// get user from local storage
const accessToken = JSON.parse(localStorage.getItem("accessToken"));
const initialState = {
  accessToken: accessToken ? accessToken : null,
  error: false,
  success: false,
  loading: false,
  modified: false,
  message: "",
};

// signup action creator
// tham số thứ nhất là tên action
// tham số thứ 2 là 1 func, có tham số là data + thunk
export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      return await signupRequest(data);
    } catch (error) {
      const message = error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const activateAccount = createAsyncThunk(
  "auth/activate",
  async (token, thunkAPI) => {
    try {
      return await activateAccountRequest(token);
    } catch (error) {
      const message = error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (data, thunkAPI) => {
    try {
      return await signinRequest(data);
    } catch (error) {
      const message = error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await signupRequest.logout();
});

export const updateInfo = createAsyncThunk(
  "auth/updateInfo",
  async (info, thunkAPI) => {
    try {
      return await signupRequest.updateInfo(info);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.modified = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      // signin
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.accessToken = action.payload.data.accessToken;

        // set accessToken to local storage
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.data.accessToken)
        );
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      // activate account
      .addCase(activateAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(activateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(activateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      // update info
      .addCase(updateInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.modified = true;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
