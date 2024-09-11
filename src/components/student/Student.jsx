import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Spinner,
  Input,
  Table,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import {
  addStudent,
  deleteStudentById,
  getAlll,
  updateStudent,
} from "../../redux/studentSlice";

const StudentPage = () => {
  const dispatch = useDispatch();
  const { students, totalPages, currentPage, loading, error } = useSelector(
    (state) => state.student
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // Either 'add' or 'update'
  const [studentFormData, setStudentFormData] = useState({
    id: "",
    name: "",
    city: "",
    dateOfBirth: "",
    classification: "",
  });

  useEffect(() => {
    dispatch(getAlll({ currentPage: 0, limit: 10 }));
  }, [dispatch]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setStudentFormData({
      id: "",
      name: "",
      city: "",
      dateOfBirth: "",
      classification: "",
    });
  };

  const handlePageChange = (newPage) => {
    dispatch(getAlll({ currentPage: newPage, limit: 10 }));
  };

  const handleDelete = (id) => {
    dispatch(deleteStudentById(id)).then(() => {
      dispatch(getAlll({ currentPage, limit: 10 }));
    });
  };

  const handleUpdate = (student) => {
    setModalType("update");
    setStudentFormData(student);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setModalType("add");
    toggleModal();
  };

  const handleInputChange = (e) => {
    setStudentFormData({ ...studentFormData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = () => {
    if (modalType === "add") {
      dispatch(addStudent(studentFormData)).then(() => {
        dispatch(getAlll({ currentPage, limit: 10 }));
        toggleModal();
      });
    } else if (modalType === "update") {
      dispatch(updateStudent(studentFormData)).then(() => {
        dispatch(getAlll({ currentPage, limit: 10 }));
        toggleModal();
      });
    }
  };

  const filteredStudents = students
    ?.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .reverse();

  return (
    <div className="container mt-5">
      <h1 className="text-center" style={{ color: "orange" }}>
        Student List
      </h1>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "300px", margin: "auto" }}
        />
      </div>

      <Button color="primary" onClick={handleAdd}>
        Add Student
      </Button>

      {loading && (
        <div className="text-center">
          <Spinner style={{ color: "orange" }} />
        </div>
      )}
      {error && <p className="text-danger text-center">Error: {error}</p>}

      {!loading && filteredStudents && (
        <div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>City</th>
                <th>Date of Birth</th>
                <th>Classification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.city}</td>
                  <td>{student.dateOfBirth}</td>
                  <td>{student.classification}</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      color="success"
                      onClick={() => handleUpdate(student)}
                      style={{ marginLeft: "20px" }}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-between mt-3">
            <Button
              color="warning"
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="align-self-center">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              color="warning"
              disabled={currentPage === totalPages - 1}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Modal for Add/Update Student */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader>
          {modalType === "add" ? "Add Student" : "Update Student"}
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="name">Student Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={studentFormData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={studentFormData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="classification">Classification:</label>
            <input
              type="text"
              className="form-control"
              id="classification"
              value={studentFormData.classification}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              value={studentFormData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleFormSubmit}>
            {modalType === "add" ? "Add" : "Update"}
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default StudentPage;
