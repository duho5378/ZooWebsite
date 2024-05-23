import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate , Navigate} from "react-router-dom";
import './Employee.css'

function BuyFood() {
    const [buyFood, setBuyFood] = useState([]);
    const [food, setFood] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate()

    const isAdmin = localStorage.getItem("isAdmin") === "true";
    var link_add = '/add_buy_food';
    var link_edit = '/edit_buy_food/';
    
    if (isAdmin) { 
      link_add = '/dashboard/add_buy_food'
      link_edit = '/dashboard/edit_buy_food/';
    }
  
    useEffect(() => {
      axios.get("http://localhost:3000/auth/buy_food")
        .then((result) => {
          if (result.data.Status) {
            setBuyFood(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
    
        axios.get("http://localhost:3000/auth/food")
        .then((result) => {
          if (result.data.Status) {
            setFood(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));


        
    }, []);
  
    const findFood = (id) => {
        const foundFood = food.find((emp) => emp.id === id);
        return foundFood ? `${foundFood.name}` : "";
      };


    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_buy_food/'+id)
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
            <h3>Buy Food List</h3>
          </div>
          <Link to={link_add} className="btn btn-primary">
            Add Bill
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
                  <th>ID Bill</th>
                  <th>Food</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {buyFood
                .filter((e) =>
                  findFood(e.id_food).toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{findFood(e.id_food)}</td>
                    <td>{e.quantity}</td>
                    <td>{e.unit_price}</td>
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

export default BuyFood