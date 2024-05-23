import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Employee.css'

function MedicalHistory() {
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [animal, setAnimal] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const navigate = useNavigate()


    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const addMedicalPath = isAdmin ? '/dashboard/add_medical_history' : '/add_medical_history';
    const editMedicalPath = isAdmin ? '/dashboard/edit_medical_history' : '/edit_medical_history';
  
    useEffect(() => {
      axios.get("http://localhost:3000/auth/medical_history")
        .then((result) => {
          if (result.data.Status) {
            setMedicalHistory(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
    
        axios.get("http://localhost:3000/auth/employee")
        .then((result) => {
          if (result.data.Status) {
            setEmployee(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
        axios.get("http://localhost:3000/auth/animal")
        .then((result) => {
          if (result.data.Status) {
            setAnimal(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));


        
    }, []);
  
    const findEmployeeName = (employeeId) => {
        const foundEmployee = employee.find((emp) => emp.id === employeeId);
        return foundEmployee ? `${foundEmployee.first_name} ${foundEmployee.last_name}` : "";
      };
    const findAnimal = (id) => {
        const foundAnimal = animal.find((emp) => emp.id === id);
        return foundAnimal ? `${foundAnimal.name}` : "";
      };
    
    const formatDate = (dateString) => {
        if (!dateString) {
          return "Null";
        }
      
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
      };


    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_medical_history/'+id)
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
            <h3>Medical History</h3>
          </div>
          <Link to={addMedicalPath} className="btn btn-primary">
            Add Medical History
          </Link>
          <div className="mt-3">
            <input
                type="text"
                placeholder="Search by Animal, Employee, Diagnose, Treatment"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-2"
            /> 
            <table className="table">
              <thead>
                <tr>
                  <th>ID History</th>
                  <th>Animal</th>
                  <th>Employee</th>
                  <th>Diagnose</th>
                  <th>Treatment</th>
                  <th>Day</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicalHistory
                .filter((e) =>
                  findAnimal(e.id_animal).toLowerCase().includes(searchTerm.toLowerCase()) ||
                  findEmployeeName(e.id_employee).toLowerCase().includes(searchTerm.toLowerCase()) ||
                  e.diagnose.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  e.treatment.toLowerCase().includes(searchTerm.toLowerCase()) 
                )
                .map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.id_animal} | {findAnimal(e.id_animal)}</td>
                    <td>{e.id_employee} | {findEmployeeName(e.id_employee)}</td>
                    <td>{e.diagnose}</td>
                    <td>{e.treatment}</td>
                    <td>{formatDate(e.day)}</td>
                    <td>
                      <Link to={`${editMedicalPath}/${e.id}`} className="btn btn-primary btn-sm me-2">
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


export default MedicalHistory