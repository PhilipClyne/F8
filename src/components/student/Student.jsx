import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner, Input, Table } from "reactstrap";
import { deleteStudentById, getAlll } from "../../redux/studentSlice";

const StudentPage = () => {
  const dispatch = useDispatch();
  const { students, totalPages, currentPage, loading, error } = useSelector(
    (state) => state.student
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAlll({ currentPage: 0, limit: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(getAlll({ currentPage: newPage, limit: 10 }));
  };

  const handleDelete = (id) => {
    dispatch(deleteStudentById(id));
  };

  const filteredStudents = students?.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center" style={{ color: "orange" }}>
        Student List
      </h1>

      {/* Search Input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "300px", margin: "auto" }}
        />
      </div>

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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.city}</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
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
    </div>
  );
};

export default StudentPage;
