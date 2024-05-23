import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Employee.css'

function Site() {
    const [site, setSite] = useState([]);
    const navigate = useNavigate()
  
    useEffect(() => {
      axios.get("http://localhost:3000/auth/site")
        .then((result) => {
          if (result.data.Status) {
            setSite(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
  
    }, []);
  
    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/site/'+id)
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
          <h3>Site List</h3>
        </div>
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Use For</th>
              </tr>
            </thead>
            <tbody>
              {site.map((e) => (
                <tr>
                  <td>{e.id}</td>
                  <td>{e.location}</td>
                  <td>{e.used_for}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
export default Site