import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const {id} = useParams()
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
      const [department, setDepartment] = useState([])
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:3000/auth/department')
        .then(result => {
            if(result.data.Status) {
                setDepartment(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/employee/'+id)
        .then(result => {
            setEmployee({
                ...employee,
                first_name: result.data.Result[0].first_name,
                last_name: result.data.Result[0].last_name,
                sex: result.data.Result[0].sex,
                birth: result.data.Result[0].birth,
                phone_number: result.data.Result[0].phone_number,
                email: result.data.Result[0].email,
                password: result.data.Result[0].password,
                salary: result.data.Result[0].salary,
                id_department: result.data.Result[0].id_department,
                id_leader: result.data.Result[0].id_leader,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/'+id, employee)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
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
              value={employee.first_name}
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
              value={employee.last_name}
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
              value={employee.sex}
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
              value={employee.birth}
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
              value={employee.phone_number}
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
              value={employee.email}
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
              value={employee.password}
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
              value={employee.salary}
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
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee