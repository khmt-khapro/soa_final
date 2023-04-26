import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  activateAccountRequest,
  createNewPasswordRequest,
  forgotPasswordRequest,
  signinRequest,
  signupRequest,
} from "./apis/auth.axios";
import { followTag, unfollowTag } from "./apis/post";

// get user from local storage
// const accessToken = JSON.parse(localStorage.getItem("accessToken"));
const initialState = {
  // accessToken: accessToken ? accessToken : null,
  error: false,
  success: false,
  loading: false,
  modified: false,
  message: "",
  user: JSON.parse(localStorage.getItem("user")) || null,
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

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      return await forgotPasswordRequest(email);
    } catch (error) {
      const message = error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewPassword = createAsyncThunk(
  "auth/createNewPassword",
  async (data, thunkAPI) => {
    try {
      return await createNewPasswordRequest(data);
    } catch (error) {
      const message = error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {});

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

export const updateFollowTags = createAsyncThunk(
  "auth/updateFollowTag",
  async ({ tagId, userId, following_tags }, thunkAPI) => {
    try {
      return following_tags.includes(tagId)
        ? await unfollowTag(tagId, userId)
        : await followTag(tagId, userId);
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
        // state.accessToken = action.payload.data.accessToken;
        state.user = action.payload.data;

        // set accessToken to local storage
        // localStorage.setItem(
        //   "accessToken",
        //   JSON.stringify(action.payload.data.accessToken)
        // );
        // set user data to local storage
        localStorage.setItem("user", JSON.stringify(action.payload.data));
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
      // forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      // create new password
      .addCase(createNewPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(createNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        console.log("store logout update");
        localStorage.removeItem("user");
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
      })
      .addCase(updateFollowTags.fulfilled, (state, action) => {
        state.user = { ...state.user, following_tags: action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;