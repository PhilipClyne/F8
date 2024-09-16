import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  deleteStudentById,
  getAlll,
  updateStudent,
} from "../../redux/studentSlice";

const StudentPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const dispatch = useDispatch();
  const { students, totalPages, currentPage, loading, error } = useSelector(
    (state) => state.student
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchYear, setSearchYear] = useState(""); // New state for year search
  const [searchCity, setSearchCity] = useState(""); // New state for city search
  const [editingId, setEditingId] = useState(null);
  const [newStudentData, setNewStudentData] = useState({
    name: "",
    city: "",
    dateOfBirth: "",
    classification: "",
    image: "",
  });
  const handleNewStudentInputChange = (e) => {
    setNewStudentData({ ...newStudentData, [e.target.name]: e.target.value });
  };
  const handleAddStudent = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Implement logic to add the new student data (e.g., API call)
    dispatch(addStudent(newStudentData)) // Replace with your actual dispatch action
      .then(() => {
        // Clear the form after successful addition
        setNewStudentData({
          name: "",
          city: "",
          dateOfBirth: "",
          classification: "",
          image: "",
        });
        // Fetch updated student data (optional)
        dispatch(getAlll({ currentPage: 0, limit: 10 }));
      })
      .catch((error) => {
        console.error("Error adding student:", error);
        // Handle errors appropriately (e.g., display error message)
      });
  };
  const [studentFormData, setStudentFormData] = useState({
    id: "",
    name: "",
    city: "",
    dateOfBirth: "",
    classification: "",
    image: "",
  });

  useEffect(() => {
    dispatch(getAlll({ currentPage: 0, limit: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(getAlll({ currentPage: newPage, limit: 10 }));
  };

  const handleDelete = (id) => {
    dispatch(deleteStudentById(id)).then(() => {
      dispatch(getAlll({ currentPage, limit: 10 }));
    });
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setStudentFormData(student);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setStudentFormData({
      id: "",
      image: "",
      name: "",
      city: "",
      dateOfBirth: "",
      classification: "",
    });
  };

  const handleSaveEdit = () => {
    dispatch(updateStudent(studentFormData)).then(() => {
      setEditingId(null);
      dispatch(getAlll({ currentPage, limit: 10 }));
    });
  };

  const handleInputChange = (e) => {
    setStudentFormData({ ...studentFormData, [e.target.name]: e.target.value });
  };

  const filteredStudents = students?.filter((student) => {
    const matchesName = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesYear = searchYear
      ? student.dateOfBirth.slice(0, 4) === searchYear
      : true;

    const matchesCity = searchCity
      ? student.city.toLowerCase().includes(searchCity.toLowerCase())
      : true;

    return matchesName && matchesYear && matchesCity;
  });

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-center text-orange-500 text-2xl font-bold mb-5">
        Student List
      </h1>
      {showAddForm && (
        <form onSubmit={handleAddStudent}>
          <h2 className="text-center text-orange-500 text-xl font-bold mb-3">
            Add Student
          </h2>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={newStudentData.name}
              onChange={handleNewStudentInputChange}
              className="p-2 border rounded-lg w-full"
              required
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              value={newStudentData.city}
              onChange={handleNewStudentInputChange}
              className="p-2 border rounded-lg w-full"
              required
            />
            <input
              type="date"
              placeholder="Date of Birth"
              name="dateOfBirth"
              value={newStudentData.dateOfBirth}
              onChange={handleNewStudentInputChange}
              className="p-2 border rounded-lg w-full"
              required
            />
            <select
              name="classification"
              value={newStudentData.classification}
              onChange={handleNewStudentInputChange}
              className="p-2 border rounded-lg w-full"
              required
            >
              <option value="">Select Classification</option>
              <option value="Giỏi">Siêu Phàm Thần Thánh</option>
              <option value="Giỏi">Giỏi</option>
              <option value="Khá">Khá</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Yếu">Yếu</option>
            </select>
          </div>
          <div className="mb-4 flex justify-center">
            <button
              type="submit"
              className="bg-green-500 m-5 text-white w-1/3 px-4 py-2 rounded-lg"
            >
              Add Student
            </button>
            {showAddForm && (
              <button
                className="bg-red-500 m-5 text-white w-1/3 px-4 py-2 rounded-lg mr-5"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <div className="mb-4 flex justify-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg mr-5"
          onClick={() => setShowAddForm(true)}
        >
          Add Student
        </button>
        {/* Search by student name */}
        <input
          type="text"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg w-1/4 mr-2"
        />
        {/* Search by year of birth */}
        <input
          type="text"
          placeholder="Search by year of birth"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
          className="p-2 border rounded-lg w-1/4 mr-2"
        />

        {/* Search by city */}
        <input
          type="text"
          placeholder="Search by city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="p-2 border rounded-lg w-1/4"
        />
        {/* Search by start to end
        <input
          type="text"
          placeholder="Search by start to end"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
          className="p-2 border rounded-lg w-1/6 mr-2"
        /> */}
        {/* Search by start to end */}
        {/* <input
          type="text"
          placeholder="Search by start to end"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
          className="p-2 border rounded-lg w-1/6 mr-2"
        />*/}
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="text-orange-500">Loading...</div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-3xl overflow-hidden">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Id</th>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">City</th>
                <th className="py-3 px-6 text-left">Date of Birth</th>
                <th className="py-3 px-6 text-left">Classification</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className="border-b hover:bg-orange-50">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">
                    {editingId === student.id ? (
                      <input
                        type="text"
                        name="image"
                        value={studentFormData.image}
                        onChange={handleInputChange}
                        className="border rounded-lg p-1"
                      />
                    ) : (
                      <img src={student.image} alt="" className="w-32 " />
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingId === student.id ? (
                      <input
                        type="text"
                        name="name"
                        value={studentFormData.name}
                        onChange={handleInputChange}
                        className="border rounded-lg p-1"
                      />
                    ) : (
                      student.name
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingId === student.id ? (
                      <input
                        type="text"
                        name="city"
                        value={studentFormData.city}
                        onChange={handleInputChange}
                        className="border rounded-lg p-1"
                      />
                    ) : (
                      student.city
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingId === student.id ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={studentFormData.dateOfBirth}
                        onChange={handleInputChange}
                        className="border rounded-lg p-1"
                      />
                    ) : (
                      student.dateOfBirth
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingId === student.id ? (
                      <select
                        name="classification"
                        value={studentFormData.classification}
                        onChange={handleInputChange}
                        className="border rounded-lg p-1"
                      >
                        <option value="">Chọn phân loại</option>
                        <option value="Giỏi">Siêu Phàm Thần Thánh</option>
                        <option value="Giỏi">Giỏi</option>
                        <option value="Khá">Khá</option>
                        <option value="Trung bình">Trung bình</option>
                        <option value="Yếu">Yếu</option>
                      </select>
                    ) : (
                      student.classification
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {editingId === student.id ? (
                      <>
                        <button
                          className="text-green-500 hover:text-green-700 mr-2"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-5">
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              disabled={currentPage === totalPages - 1}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPage;
