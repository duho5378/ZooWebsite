import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddInfrastructure() {
    const [infrastructure, setInfrastructure] = useState({
        id: "",
        name:"",
        id_site: "",
        status: "",
    });
    
    const [site, setSite] = useState([]);    
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
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/auth/add_infrastructure', infrastructure)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/infrastructure')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-2 rounded w-35 border'>
            <h2>Add Infrastructure</h2>
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <label for="inputName" className="form-label"> name </label>
                    <input type="text" className="form-control rounded-0" id="inputName"
                    placeholder="Enter name infrastructure"
                    onChange={(e) =>
                        setInfrastructure({ ...infrastructure, name: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputIDSite" className="form-label">
                    Site Location
                    </label>
                    <select name="infrastructure" id="inputIDSite" className="form-select"
                        onChange={(e) => setInfrastructure({...infrastructure, id_site: e.target.value})}>
                    {site.map((d) => {
                        return <option value={d.id}>{d.location}</option>;
                    })}
                    </select>
                </div>
                <div className="col-12">
                    <label for="inputStatus" className="form-label"> Status </label>
                    <input type="text" className="form-control rounded-0" id="inputStatus"
                    placeholder="Enter Status"
                    onChange={(e) =>
                        setInfrastructure({ ...infrastructure, status: e.target.value })
                    }
                    />
                </div>
                <button className='btn btn-primary w-100 rounded-0 mb-2'>Add infrastructure</button>
            </form>
        </div>
    </div>
  )
}

export default AddInfrastructure