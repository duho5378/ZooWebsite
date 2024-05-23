import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3000/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            localStorage.setItem("isAdmin", "true");
            navigate('/dashboard');
          } 
          if (result.data.role === "employee") {
            // localStorage.setItem("isEmp", "true");
            navigate('/employee_dashboard/' + result.data.id);
          }
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  // Add client-side URL checking
  useEffect(() => {
    console.log("Client-side URL checking");
    
    const currentPath = window.location.pathname;
    
    if (currentPath.startsWith("/dashboard") && result.data.role === "employee") {
      console.log("Redirecting from /dashboard");
      navigate('/employee_login');
    }
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2 className="text-center">Entrance</h2>
        <div className="d-flex justify-content-between mt-5 mb-2">
          <button type="button" className="btn btn-primary" onClick={() => { navigate('/employee_login') }}>
            Employee
          </button>
          <button type="button" className="btn btn-danger" onClick={() => { navigate('/adminlogin') }}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;