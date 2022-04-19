import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/API";

const initialState = {
  postList: [],
  myList: [],
  selectData: {value: '', title: ''},
  status: "idle",
};


export const fetchPostList = createAsyncThunk("postlist", async (state, { rejectWithValue }) => {
  try {
    const {data} = await API.getPostList();
    const list = data.data;
    const result = list.filter((item, i) => {
      return item.favourited === false;
    });
    return result.slice(0, 6);
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const fetchMyList = createAsyncThunk("mylist", async (state, { rejectWithValue }) => {
  try {
    const {data} = await API.getFavouriteList();
    console.log('myList:',  data.data)
    const list = data.data;
    const result = list.filter((item, i) => {
      return  item.favourited === true && i < 6;
    });
    
    return result;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const deleteMyList = createAsyncThunk("deleteMylist", async (id, { rejectWithValue }) => {
  try {
    const {data} = await API.deleteFavourite(id);
    return  data;
  } catch (err) {
    console.log('err:', err)
    return rejectWithValue(err.response.data)
  }
});

export const postListSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {
    setSelectData: (state, action) => {
      state.selectData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostList.rejected, (state) => {
        state.status = "reject";
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.status = "idle";
        state.postList = action.payload;
      })
      .addCase(fetchMyList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyList.rejected, (state) => {
        state.status = "reject";
      })
      .addCase(fetchMyList.fulfilled, (state, action) => {
        state.status = "idle";
        state.myList = action.payload;
      })
      .addCase(deleteMyList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMyList.rejected, (state) => {
        state.status = "reject";
      })
      .addCase(deleteMyList.fulfilled, (state, action) => {
        state.status = "idle";
      })
  },
});

export const {setSelectData} = postListSlice.actions;

export const selectPostList = (state) => state.postList;

export default postListSlice.reducer;
