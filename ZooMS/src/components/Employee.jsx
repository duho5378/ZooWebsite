import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Employee.css'

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [department, setDepartment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()



  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const addEmpPath = isAdmin ? '/dashboard/add_employee' : '/add_employee';
  const editEmpPath = isAdmin ? '/dashboard/edit_employee' : '/edit_employee';

  useEffect(() => {
    axios.get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch((err) => console.log(err));

    axios.get('http://localhost:3000/auth/department')
    .then(result => {
        if(result.data.Status) {
            setDepartment(result.data.Result);
        } else {
            alert(result.data.Error)
        }
    }).catch(err => console.log(err))
  }, []);

  const getDepartmentName = (id_department) => {
    const selectedDepartment = department.find(c => c.id === id_department);
    return selectedDepartment ? selectedDepartment.name : 'N/A';
  }
  
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Null";
    }
  
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to={addEmpPath} className="btn btn-primary">
        Add Employee
      </Link>
      <div className="mt-3">
        <input
            type="text"
            placeholder="Search by Name, Phone, Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-2"
        />        
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Sex</th>
              <th>Birth</th>
              <th>Phone number</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {employee
            .filter((e) =>
              e.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              e.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              e.phone_number.includes(searchTerm)
            )
            .map((e) => (
              <tr key={e.id}>
                <td>{e.first_name}</td>
                <td>{e.last_name}</td>
                <td>{e.sex}</td>
                <td>{formatDate(e.birth)}</td>
                <td>{e.phone_number}</td>
                <td>{e.email}</td>
                <td>{e.salary}</td>
                <td>{getDepartmentName(e.id_department)}</td>
                <td>
                  <Link to={`${editEmpPath}/${e.id}`} className="btn btn-primary btn-sm me-2">
                    Edit
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;