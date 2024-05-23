import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Employee.css'
function Food() {
    const [food, setFood] = useState([]);
    const [eat, setEat] = useState([]);
    const [animal, setAnimal] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()



    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const addFoodPath = isAdmin ? '/dashboard/add_food' : '/add_food';
    const editFoodPath = isAdmin ? '/dashboard/edit_food' : '/edit_food';
  
    useEffect(() => {
      axios.get("http://localhost:3000/auth/food")
        .then((result) => {
          if (result.data.Status) {
            setFood(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));

      axios.get("http://localhost:3000/auth/eat")
        .then((result) => {
          if (result.data.Status) {
            setEat(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
      axios.get("http://localhost:3000/auth/animal")
        .then((result) => {
          if (result.data.Status) {
            setAnimal(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
        
  

    }, []);
    const findEat = (id) => {
        const foundEat = eat.find((eat) => eat.id === id);
        return foundEat ? `${foundEat.quantity}` : "";
    };
    const findAnimal = (id) => {
      const foundEat = eat.find((eat) => eat.id_food === id);
      if (foundEat) {
        const foundAnimal = animal.find((animal) => animal.id === foundEat.id_animal);
        return foundAnimal ? foundAnimal.name : "";
      }
      return "";
    };
  
    const formatDate = (dateString) => {
      if (!dateString) {
        return "Null";
      }
    
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
    };
  
    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_food/'+id)
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
          <h3>Feeding List</h3>
        </div>
        <Link to={addFoodPath} className="btn btn-primary">
          Add food
        </Link>
        <div className="mt-3">
          <input
              type="text"
              placeholder="Search by Animal, Food"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-2"
          /> 
          <table className="table">
            <thead>
              <tr>
                <th>Animal</th>
                <th><Link to="/dashboard/buy_food" className="text-decoration-underline text-dark-blue">Food </Link> </th>
                <th>Quantity</th>
                <th>unit</th>
                <th>date purch</th>
                <th>date expiry</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {food
              .filter((e) =>
                findAnimal(e.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.name.toLowerCase().includes(searchTerm.toLowerCase()) 
              )
              .map((e) => (
                <tr key={e.id}>
                  <td>{findAnimal(e.id)}</td>
                  <td>{e.name}</td>
                  <td>{findEat(e.quantity)} / {e.inventory_quantity}</td>
                  <td>{e.unit}</td>
                  <td>{formatDate(e.date_purch)}</td>
                  <td>{formatDate(e.date_expiry)}</td>
                  <td>
                    <Link to={`${editFoodPath}/${e.id}`} className="btn btn-primary btn-sm me-2">
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

export default Food