import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4300/api/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4300/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      if (response.ok) {
        const data = await response.json();
        return { user: data.email, accessToken: data.accessToken };
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:4300/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('accessToken');
});

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.status = "success";
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'success';
        state.error = null;
        state.user = null;
      });
  },
});
export default userSlice.reducer;
