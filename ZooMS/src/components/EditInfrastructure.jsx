import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditInfrastructure() {
    const {id} = useParams()
    const [infrastructure, setInfrastructure] = useState({
        name:"",
        id_site: "",
        status: "",
      });
      const [site, setSite] = useState([]);   
      const navigate = useNavigate()

      useEffect(()=> {
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

        axios.get('http://localhost:3000/auth/infrastructure/'+id)
        .then(result => {
            setInfrastructure({
                ...infrastructure,
                name: result.data.Result[0].name,
                id_site: result.data.Result[0].id_site,
                status: result.data.Result[0].status,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_infrastructure/'+id, infrastructure)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/infrastructure')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit infrastructure</h3>
        <form className="row g-1" onSubmit={handleSubmit}>

        <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter infrastructure name"
              value={infrastructure.name}
              onChange={(e) =>
                setInfrastructure({ ...infrastructure, name: e.target.value })
              }
            />
        </div>
          <div className="col-12">
              <label for="inputIDSite" className="form-label">
              Site Location
              </label>
              <select name="department" id="inputIDSite" className="form-select"
                  onChange={(e) => setInfrastructure({...infrastructure, id_site: e.target.value})}>
              {site.map((d) => {
                  return <option value={d.id}>{d.location}</option>;
              })}
              </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputStatus" className="form-label">
              Status
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputStatus"
              placeholder="Enter renew status"
              value={infrastructure.status}
              onChange={(e) =>
                setInfrastructure({ ...infrastructure, status: e.target.value })
              }
            />
          </div>
        
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Infrastructure
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default EditInfrastructure