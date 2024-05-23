import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditAssignWork() {
    const {id} = useParams()
    const [work, setWork] = useState({
        id_site: "",
        work: "",
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

        axios.get('http://localhost:3000/auth/assign_work/'+id)
        .then(result => {
            setWork({
                ...work,
                id_site: result.data.Result[0].id_site,
                work: result.data.Result[0].work,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_assign_work/'+id, work)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/assign_work')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Assign Work</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
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
            <label htmlFor="inputWork" className="form-label">
              Assign Work
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputWork"
              placeholder="Enter Assign work"
              value={work.work}
              onChange={(e) =>
                setWork({ ...work, work: e.target.value })
              }
            />
          </div>
          

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Assign Work
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAssignWork