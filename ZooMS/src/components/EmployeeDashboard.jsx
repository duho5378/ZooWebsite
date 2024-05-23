import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams,Link, Outlet } from 'react-router-dom';
import './EmployeeDashboard.css';



const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState([])
  const [assignWork, setAssignWork] = useState([])
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employee/employee_record/' + id);
      setEmployee(response.data[0]);
      
      const assignWorkResponse = await axios.get('http://localhost:3000/employee/assign_work/' + id);
      setAssignWork(assignWorkResponse.data[0]);
    } catch (error) {
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
    };

  const handleSecondJob = (departmentId) => {
    let newPath = '';

    if (departmentId === 3) {
      newPath = '/department';
    } else if (departmentId === 4) {
      newPath = '/buy_food';
    }else if (departmentId === 5 || departmentId === 7) {
      newPath = '/infrastructure';
    }else if (departmentId === 6) {
      newPath = '/food';
    }else if (departmentId === 8) {
      newPath = '/animal';
    } else {
      newPath = '/edit/default_path';
    }

    navigate(newPath);
  };

  const handleAdmin = (departmentId) => {
    let newPath = '';

    if (departmentId === 2) {
      newPath = '/dashboard';
    } else {
      newPath = '/edit/default_path';
    }

    navigate(newPath);
  };

  const handleFirstJob = (departmentId) => {

    let newPath = '';

    if (departmentId === 3 || departmentId === 4) {
      newPath = '/employee';
    } else if (departmentId === 5 || departmentId === 7 || departmentId === 8) {
      newPath = '/assign_work';
    } else if (departmentId === 6) {
      newPath = '/medical_history';
    } else{
      newPath = '/edit/default_path';
    }
    navigate(newPath);
  };

  const handleThirdJob = (departmentId) => {
    let newPath = '';


    if (departmentId === 6) {
      newPath = '/animal';
    } else {

      newPath = '/edit/default_path';
    }
    navigate(newPath);
  };

  const renderFirstEditButton = () => {
    if (employee.id_department === 3 || employee.id_department === 4) {
      return (
        <button className='btn btn-primary me-2' onClick={() => handleFirstJob(employee.id_department)}>
          Employees
        </button>
      );
    } else if (employee.id_department === 5 || employee.id_department === 7 || employee.id_department === 8) {
      return (
        <button className='btn btn-primary me-2' onClick={() => handleFirstJob(employee.id_department)}>
          Assign Work
        </button>
      );
      
    } else if (employee.id_department === 6) {
      return (
        <button className='btn btn-primary me-2' onClick={() => handleFirstJob(employee.id_department)}>
          Medical History
        </button>
      );
    
    } 
    return null;
  };
  
  const renderSecondEditButton = () => {
    if (employee.id_department === 3) {
      return (
        <button className='btn btn-primary me-2' onClick={() => handleSecondJob(employee.id_department)}>
          Department
        </button>
      );
    } else if (employee.id_department === 4) {
      return (
        <button className='btn btn-primary me-2' onClick={() => handleSecondJob(employee.id_department)}>
          Buy Food
        </button>
      );
      
    }else if (employee.id_department === 5 || employee.id_department === 7) {
      return (
        <button className='btn btn-primary me-2' onClick={() => handleSecondJob(employee.id_department)}>
          Infrastructure
        </button>
      );
      
    }else if (employee.id_department === 6) {
      return (
        <button className='btn btn-primary me-2' onClick={() => handleSecondJob(employee.id_department)}>
          Food
        </button>
      );
      
    }else if (employee.id_department === 8) {
      return (
        <button className='btn btn-primary me-2' onClick={() => handleSecondJob(employee.id_department)}>
          Animal
        </button>
      );
    }
    return null;
  }; 



  const renderThirdEditButton = () => {
    if (employee.id_department === 6) {
      return (
        <button className='btn btn-primary me-2' onClick={() => handleThirdJob(employee.id_department)}>
          Animal
        </button>
      );
    } 
    return null;
  }; 

  const renderAdminButton = () => {
    if (employee.id_department === 2) {
      return (
        <button className='btn btn-primary me-2' onClick={() => handleAdmin(employee.id_department)}>
          Dashboard
        </button>
      );
    } 
    return null;
  }; 

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
              <div>
                {renderFirstEditButton()}
                <Outlet />
                {renderSecondEditButton()}
                <Outlet />
                {renderThirdEditButton()}
                <Outlet />
                {renderAdminButton()}
                <Outlet />
              </div>
          </div>
          <div>
              <Link to={`/edit_employee/`+employee.id} className="btn btn-success me-2">
                        Edit
                      </Link>
              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </div>
          <div>
              <h3> Work: {assignWork && assignWork.work ? assignWork.work : 'none'}</h3>
          </div>
      </div>
  </div>
)
}
export default EmployeeDashboard
