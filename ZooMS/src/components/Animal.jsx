import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import './Employee.css'

function Animal() {
    const [animal, setAnimal] = useState([]);
    const [species, setSpecies] = useState([]);
    const [zoo, setZoo] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate()

    const isAdmin = localStorage.getItem("isAdmin") === "true";
    var link_add = '/add_animal';
    var link_edit = '/edit_animal/';
    var zoos = '/zoo';
    var speciess = '/species'
    
    if (isAdmin) { 
      link_add = '/dashboard/add_animal'
      link_edit = '/dashboard/edit_animal/';
      zoos = '/dashboard/zoo';
      speciess = '/dashboard/species'
    }
  
    useEffect(() => {
      axios.get("http://localhost:3000/auth/animal")
        .then((result) => {
          if (result.data.Status) {
            setAnimal(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
  
        axios.get("http://localhost:3000/auth/species")
        .then((result) => {
          if (result.data.Status) {
            setSpecies(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));

        axios.get("http://localhost:3000/auth/zoo")
        .then((result) => {
          if (result.data.Status) {
            setZoo(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
    }, []);
  
    const findSpecies = (speciesId) => {
        const foundSpecies = species.find((species) => species.id === speciesId);
        return foundSpecies ? `${foundSpecies.name}: ${foundSpecies.conservation_status}` : "";
    };

    const formatDate = (dateString) => {
      if (!dateString) {
        return "Null";
      }
    
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
    };
    
    const getZooName = (origin) => {
        const selectedZoo = zoo.find(c => c.address === origin);
        return selectedZoo ? selectedZoo.name : 'N/A';
    };
  
    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_animal/'+id)
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
          <h3>Animal List</h3>
        </div>
        <Link to = {link_add} className="btn btn-primary">
          Add Animal
        </Link>
        <div className="mt-3">
          <input
              type="text"
              placeholder="Search by Animal, Origin, Species"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-2"
          />          
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth</th>
                <th>Sex</th>
                <th>Day Arrive</th>
                <th>Health</th>
                <th><Link to={zoos} className="text-decoration-underline text-dark-blue">Origin </Link> </th>
                <th><Link to={speciess} className="text-decoration-underline text-dark-blue">Species </Link></th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {animal
              .filter((e) =>
                e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.sex.toLowerCase().includes(searchTerm.toLowerCase()) ||
                getZooName(e.origin).toLowerCase().includes(searchTerm.toLowerCase()) ||
                findSpecies(e.id_species).toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{formatDate(e.birth)}</td>
                  <td>{e.sex}</td>
                  <td>{formatDate(e.day_arrive)}</td>
                  <td>{e.health_status}</td>
                  <td>{getZooName(e.origin)}</td>
                  <td>{findSpecies(e.id_species)}</td>
                  <td>
                    <Link to={link_edit+e.id} className="btn btn-primary btn-sm me-2">
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

export default Animal