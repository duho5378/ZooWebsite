import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    sex: "",
    birth: "",
    phone_number: "",
    email: "",
    password: "",
    salary: "",
    id_department: "",
    id_leader: "",
  });
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/department")
      .then((result) => {
        if (result.data.Status) {
          setDepartment(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3000/auth/add_employee', employee)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/employee')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputFName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputFName"
              placeholder="Enter First Name"
              onChange={(e) =>
                setEmployee({ ...employee, first_name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputLName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLName"
              placeholder="Enter Last Name"
              onChange={(e) =>
                setEmployee({ ...employee, last_name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputSex" className="form-label">
              Sex
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSex"
              placeholder="Nam/male, Nữ/Female"
              onChange={(e) =>
                setEmployee({ ...employee, sex: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputBirth" className="form-label">
              Birth
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputBirth"
              placeholder="Enter Birth"
              onChange={(e) =>
                setEmployee({ ...employee, birth: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPhoneNumber" className="form-label">
              Phone number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPhoneNumber"
              placeholder="Enter Phone number"
              onChange={(e) =>
                setEmployee({ ...employee, phone_number: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="department" className="form-label">
              Department
            </label>
            <select name="department" id="department" className="form-select"
                onChange={(e) => setEmployee({...employee, id_department: e.target.value})}>
              {department.map((d) => {
                return <option value={d.id}>{d.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <label for="inputLeader" className="form-label">
              Leader
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputLeader"
              placeholder="Enter Leader ID"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, id_leader: e.target.value })
              }
            />
          </div>
          {/* <div className="col-12">
            <label for="leader" className="form-label">
              Leader
            </label>
            <select name="leader" id="leader" className="form-select"
                onChange={(e) => setEmployee({...employee, id_leader: e.target.value})}>
              {employee.map((e) => {
                return <option value={e.id}>{e.id_leader}</option>;
              })}
            </select>
          </div> */}
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
