import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddAssignWork() {
    const [work, setWork] = useState({
        id: "",
        id_site: "",
        work: "",
    });
    
    const [site, setSite] = useState([]);    
    const [employee, setEmployee] = useState([]);    
    const navigate = useNavigate()

    useEffect(() => {
        axios
          .get("http://localhost:3000/auth/site")
          .then((result) => {
            if (result.data.Status) {
              setSite(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));

        axios
          .get("http://localhost:3000/auth/employee")
          .then((result) => {
            if (result.data.Status) {
              setEmployee(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/auth/add_assign_work', work)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/assign_work')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-2 rounded w-35 border'>
            <h2>Add Assign Work</h2>
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <label for="inputID" className="form-label">
                    ID | Name
                    </label>
                    <select name="ID" id="inputID" className="form-select"
                        onChange={(e) => setWork({...work, id: e.target.value})}>
                    {employee.map((d) => {
                        return <option value={d.id}>{d.id} | {d.first_name} {d.last_name}</option>;
                    })}
                    </select>
                </div>
                <div className="col-12">
                    <label for="inputIDSite" className="form-label">
                    Site Location
                    </label>
                    <select name="department" id="inputIDSite" className="form-select"
                        onChange={(e) => setWork({...work, id_site: e.target.value})}>
                    {site.map((d) => {
                        return <option value={d.id}>{d.location}</option>;
                    })}
                    </select>
                </div>
                <div className="col-12">
                    <label for="inputWork" className="form-label"> Work </label>
                    <input type="text" className="form-control rounded-0" id="inputWork"
                    placeholder="Enter assigned work"
                    onChange={(e) =>
                        setWork({ ...work, work: e.target.value })
                    }
                    />
                </div>
                <button className='btn btn-primary w-100 rounded-0 mb-2'>Add assigned work</button>
            </form>
        </div>
    </div>
  )
}

export default AddAssignWork