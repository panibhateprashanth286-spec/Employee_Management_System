import React, { useEffect, useState } from "react";

import {
    getEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee
} from "../services/EmployeeService";

function EmployeeList() {

    const [employees, setEmployees] = useState([]);

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        department: "",
        salary: "",
        role: ""
    });

    const [editingId, setEditingId] = useState(null);

    // Load employees
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        getEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Handle input
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    // Add or Update employee
    const handleSubmit = (e) => {

        e.preventDefault();

        if (editingId) {

            updateEmployee(editingId, employee)
                .then(() => {
                    fetchEmployees();

                    setEmployee({
                        name: "",
                        email: "",
                        department: "",
                        salary: "",
                        role: ""
                    });

                    setEditingId(null);
                });

        } else {

            addEmployee(employee)
                .then(() => {

                    fetchEmployees();

                    setEmployee({
                        name: "",
                        email: "",
                        department: "",
                        salary: "",
                        role: ""
                    });

                });
        }
    };

    // Delete employee
    const handleDelete = (id) => {

        deleteEmployee(id)
            .then(() => {
                fetchEmployees();
            });

    };

    // Edit employee
    const handleEdit = (emp) => {

        setEmployee({
            name: emp.name,
            email: emp.email,
            department: emp.department,
            salary: emp.salary,
            role: emp.role
        });

        setEditingId(emp.id);
    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">Employee Management System</h2>

            {/* FORM */}

            <form onSubmit={handleSubmit}>

                <div className="row">

                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-2">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Department"
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Salary"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Role"
                            name="role"
                            value={employee.role}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-2">
                        <button className="btn btn-primary w-100">

                            {editingId ? "Update" : "Add"}

                        </button>
                    </div>

                </div>

            </form>

            {/* TABLE */}

            <table className="table table-bordered table-striped mt-5">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        employees.map((emp) => (

                            <tr key={emp.id}>

                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.department}</td>
                                <td>{emp.salary}</td>
                                <td>{emp.role}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(emp)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(emp.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default EmployeeList;