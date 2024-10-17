import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all posts
export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4300/api/all-posts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return data.post;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Fetch user post
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:4300/api/get-post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch posts");
      }

      const data = await response.json();
      return data.post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Create post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:4300/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Fetch post details
export const getPostDetails = createAsyncThunk(
  "posts/getPostDetails",
  async (postID, { rejectWithValue }) => {
    if (typeof postID !== "string" || postID.length !== 24) {
      return rejectWithValue({ Error: "Invalid ObjectId format" });
    }

    try {
      const response = await fetch(
        `http://localhost:4300/api/post-details/${postID}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        console.log(`Can't get the post details`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Post not found");
      console.log(error);
      return rejectWithValue({ Error: error.message });
    }
  },
);

// Edit post
export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ id, postData }, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:4300/api/edit-post/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(postData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ Error: error });
    }
  },
);

// Delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:4300/api/delete-post/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      if (response.ok) {
        console.log("Post deleted successfully");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    posts: [],
    currentPost: undefined,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "pending";
        state.error = false;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
        state.error = false;
      })
      .addCase(fetchAllPosts.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = "pending";
        state.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "success";
        state.error = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createPost.pending, (state) => {
        state.status = "pending";
        state.error = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "success";
        state.error = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getPostDetails.pending, (state) => {
        state.status = "pending";
        state.error = false;
      })
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.currentPost = action.payload;
        state.status = "success";
        state.error = false;
      })
      .addCase(getPostDetails.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.currentPost = action.payload;
        state.status = "success";
        state.error = false;
      });
  },
});

export default postsSlice.reducer;
