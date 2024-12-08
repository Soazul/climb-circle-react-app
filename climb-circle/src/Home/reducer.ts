import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, { payload: post }) => {
      const newPost = {
        username: post.username,
        description: post.description,
        location: post.location,
        climbType: post.climbType,
        angle: post.angle,
        photo: post.photo,
        cost: post.cost,
        eventDate: post.eventDate
      };
      state.posts = [...state.posts, newPost] as any;
    },
    deletePost: (state, { payload: postId }) => {
      state.posts = state.posts.filter(
        (a: any) => a._id !== postId
      );
    },
    updatePost: (state, { payload: post }) => {
      state.posts = state.posts.map((a: any) =>
        a._id === post._id ? post : a
      ) as any;
    }
  },
});

export const { setPosts, addPost, deletePost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;
