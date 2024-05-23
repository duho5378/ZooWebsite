import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Employee.css'

function Infrastructure() {
    const [infrastructure, setInfrastructure] = useState([]);
    const [site, setSite] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()
  


    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const addInfrastPath = isAdmin ? '/dashboard/add_infrastructure' : '/add_infrastructure';
    const editInfrastPath = isAdmin ? '/dashboard/edit_infrastructure' : '/edit_infrastructure';

    useEffect(() => {
      axios.get("http://localhost:3000/auth/infrastructure")
        .then((result) => {
          if (result.data.Status) {
            setInfrastructure(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
  
        axios.get("http://localhost:3000/auth/site")
        .then((result) => {
          if (result.data.Status) {
            setSite(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
    }, []);
  
    const findSite = (siteId) => {
        const foundSite = site.find((site) => site.id === siteId);
        return foundSite ? `${foundSite.location}` : "";
    };
  
    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_infrastructure/'+id)
      .then(result => {
          if(result.data.Status) {
              window.location.reload()
          } else {
              alert(result.data.Error)
          }
      })
    } 
    return (
      <div className="px-5 mt-3">
        <div className="d-flex justify-content-center">
          <h3>Infrastructure List</h3>
        </div>
        <Link to={addInfrastPath} className="btn btn-primary">
          Add Infrastructure
        </Link>
        <div className="mt-3">
          <input
              type="text"
              placeholder="Search by Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-2"
          />
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {infrastructure
              .filter((e) =>
                  e.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{findSite(e.id_site)}</td>
                  <td>{e.status}</td>
                  <td>
                    <Link to={`${editInfrastPath}/${e.id}`} className="btn btn-primary btn-sm me-2">
                      Edit
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default Infrastructure