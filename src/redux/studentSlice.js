// src/slices/studentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";

export const getAllStudents = createAsyncThunk(
  "student/getAllStudents",
  async (_, thunkAPI) => {
    const url = BASE_URL + "students";
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAlll = createAsyncThunk(
  "student/getAll",
  async ({ currentPage, limit }, thunkAPI) => {
    const url = BASE_URL + `students?page=${currentPage}&size=${limit}`;
    try {
      const response = await axios.get(url);
      return response.data;
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
export const addStudent = createAsyncThunk(
  "student/addStudent",
  async (student, thunkAPI) => {
    const url = `${BASE_URL}students`;
    try {
      const response = await axios.post(url, student);
      return response.data; // Giả định backend trả về dữ liệu sinh viên đã tạo
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to add student"
      );
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
        state.students = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.pageable.pageNumber;
      })
      .addCase(getAlll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(deleteStudentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (student) => student.id !== action.payload.id
        );
      })
      .addCase(deleteStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong deleting student";
      })
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload); // Assuming your backend returns the created student
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong adding student";
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        // state.error = action.payload || "Something went wrong adding student";
      });
    builder
      .addCase(getAllStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default studentSlice.reducer;
