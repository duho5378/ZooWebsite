import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Employee.css'

function Species() {
    const [species, setSpecies] = useState([]);
    const [habitat, setHabitat] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate()
  
    useEffect(() => {
  
        axios.get("http://localhost:3000/auth/species")
        .then((result) => {
          if (result.data.Status) {
            setSpecies(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));

        axios.get("http://localhost:3000/auth/habitat")
        .then((result) => {
          if (result.data.Status) {
            setHabitat(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
    }, []);
  

    const findHabitatTemp = (habitatId) => {
        const foundHabitat = habitat.find((habitat) => habitat.id === habitatId);
        return foundHabitat ? `${foundHabitat.temp}` : "";
    };
    const findHabitat = (habitatId) => {
        const foundHabitat = habitat.find((habitat) => habitat.id === habitatId);
        return foundHabitat ? `${foundHabitat.name}` : "";
    };
    const findHabitatHumid = (habitatId) => {
        const foundHabitat = habitat.find((habitat) => habitat.id === habitatId);
        return foundHabitat ? `${foundHabitat.humidity}` : "";
    };
    const findHabitatDepth = (habitatId) => {
        const foundHabitat = habitat.find((habitat) => habitat.id === habitatId);
        return foundHabitat ? `${foundHabitat.depth}` : "";
    };

 
  
    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_species/'+id)
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
          <h3>Species List</h3>
        </div>
        <Link to="/dashboard/add_species" className="btn btn-primary">
          Add species
        </Link>
        <div className="mt-3">
          <input
              type="text"
              placeholder="Search by Species, Conservation status, Habitat"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-2"
          /> 
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Species</th>
                <th>Conservation status</th>
                <th>Habitat</th>
                <th>Tempuature</th>
                <th>Humidity</th>
                <th>Depth</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {species
                .filter((e) =>
                  findHabitat(e.id_habitat).toLowerCase().includes(searchTerm.toLowerCase()) ||
                  e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  e.conservation_status.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.conservation_status}</td>
                  <td>{findHabitat(e.id_habitat)}</td>
                  <td>{findHabitatTemp(e.id_habitat)}</td>
                  <td>{findHabitatHumid(e.id_habitat)}</td>
                  <td>{findHabitatDepth(e.id_habitat)}</td>
                  <td>
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

export default Species