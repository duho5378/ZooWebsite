import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        name: "",
        id_manager: "",
        inauguration_day: "",
    });
    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/auth/add_department', department)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/department')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-2 rounded w-35 border'>
            <h2>Add department</h2>
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <label for="inputName" className="form-label"> Name </label>
                    <input type="text" className="form-control rounded-0" id="inputName"
                    placeholder="Enter Department Name"
                    onChange={(e) =>
                        setDepartment({ ...department, name: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputMananger" className="form-label"> Mananger </label>
                    <input type="number" className="form-control rounded-0" id="inputMananger"
                    placeholder="Enter Mananger ID"
                    onChange={(e) =>
                        setDepartment({ ...department, id_manager: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputInaugurationDay" className="form-label"> Inauguration day </label>
                    <input type="text" className="form-control rounded-0" id="inputInaugurationDay"
                    placeholder="Enter Date"
                    onChange={(e) =>
                        setDepartment({ ...department, inauguration_day: e.target.value })
                    }
                    />
                </div>
                <button className='btn btn-primary w-100 rounded-0 mb-2'>Add department</button>
            </form>
        </div>
    </div>
  )
}

export default AddDepartment