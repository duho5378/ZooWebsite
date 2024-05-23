import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EmployeeDashboard.css';

function Profile() {
  const [employee, setEmployee] = useState([])
  const [assignWork, setAssignWork] = useState([])
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
  const fetchEmployeeData = async () => {
    try {
      // Fetch data for the authenticated user
      const response = await axios.get('http://localhost:3000/employee/dashboard/' + id);
      setEmployee(response.data[0]);
      
      // Fetch assigned work data
      const assignWorkResponse = await axios.get('http://localhost:3000/employee/assign_work/' + id);
      setAssignWork(assignWorkResponse.data[0]);
    } catch (error) {
      // Handle errors, e.g., redirect to login page
      navigate('/employee_login');
    }
  };

  fetchEmployeeData();
}, [id, navigate]);
  const handleLogout = () => {
      axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if(result.data.Status) {
          localStorage.removeItem("valid")
          navigate('/entrance')
        }
      }).catch(err => console.log(err))
    }

return (
  <div>
      <div className="p-2 d-flex justify-content-center shadow">
          <h4>Emoployee Management System</h4>
      </div>
      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
          {/* <img src={`http://localhost:3000/Images/`+employee.image} className='emp_det_image'/> */}
          <div className='d-flex align-items-center flex-column mt-5'>
              <h3>Name: {employee.first_name} {employee.last_name}</h3>
              <h3>Gender: {employee.sex} </h3>
              <h3>Phone: {employee.phone_number} </h3>
              <h3>Email: {employee.email}</h3>
              <h3>Salary: ${employee.salary}</h3>
          </div>
          <div>
              <button className='btn btn-primary me-2'>Edit</button>
              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </div>
          <div>
              <h3> Work : {assignWork.work}</h3>
          </div>
      </div>
  </div>
)
}

export default Profile