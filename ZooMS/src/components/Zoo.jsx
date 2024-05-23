import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Employee.css'

function Zoo() {
    const [zoo, setZoo] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate()



    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const addZooPath = isAdmin ? '/dashboard/add_zoo' : '/add_zoo';
  
    useEffect(() => {
      axios.get("http://localhost:3000/auth/zoo")
        .then((result) => {
          if (result.data.Status) {
            setZoo(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
  

    }, []);
  
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
      };
  
    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_zoo/'+id)
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
          <h3>Zoo places List</h3>
        </div>
        <Link to={addZooPath} className="btn btn-primary">
          Add Zoo bases
        </Link>
        <div className="mt-3">
          <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-2"
          />           
          <table className="table">
            <thead>
              <tr>
                <th>Address</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>City</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {zoo
              .filter((e) =>
                e.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.phone_number.includes(searchTerm)
              )
              .map((e) => (
                <tr key={e.address}>
                  <td>{e.address}</td>
                  <td>{e.name}</td>
                  <td>{e.phone_number}</td>
                  <td>{e.email}</td>
                  <td>{e.city}</td>
                  <td>{e.country}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.address)}>
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

export default Zoo