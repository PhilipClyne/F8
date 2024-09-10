// src/slices/studentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";

export const getAlll = createAsyncThunk(
  "student/getAll",
  async ({ currentPage, limit }, thunkAPI) => {
    const url = BASE_URL + `students?page=${currentPage}&size=${limit}`;
    try {
      const response = await axios.get(url);
      return response.data; // Assuming response.data contains the paginated result
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteStudentById = createAsyncThunk(
  "student/deleteStudentById",
  async (id, thunkAPI) => {
    const url = BASE_URL + `students/${id}`;
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async (student, thunkAPI) => {
    const url = BASE_URL + `students/${student.id}`;
    try {
      const response = await axios.put(url, student);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    totalPages: 0,
    currentPage: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlll.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAlll.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.content; // Assuming your students are in 'content'
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.pageable.pageNumber;
      })
      .addCase(getAlll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default studentSlice.reducer;
