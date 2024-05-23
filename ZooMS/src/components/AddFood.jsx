import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFood() {
    const [food, setFood] = useState({

        name:"",
        inventory_quantity: "",
        unit: "",
        date_purch: "",
        date_expiry: "",
    });
    
    const [animal, setAnimal] = useState([]);
    const [eat, setEat] = useState({
        id_animal: "",
        id_food: "",
        quantity: "",  
    });
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/auth/animal")
          .then((result) => {
            if (result.data.Status) {
              setAnimal(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));

        axios.get("http://localhost:3000/auth/eat")
          .then((result) => {
            if (result.data.Status) {
                setEat(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      }, []);


    
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/auth/add_food', food)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/food')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
        
        axios.post('http://localhost:3000/auth/add_eat', eat)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/food')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
            <h2>Add New Food</h2>
            <form onSubmit={handleSubmit}>

                <div className="col-12">
                    <label htmlFor="inputAnimal" className="form-label"> Animal </label>
                    <select
                        className="form-select rounded-0" id="inputAnimal"
                        onChange={(e) => setEat({ ...eat, id_animal: e.target.value })}>
                        <option value="">Select Animal</option>
                        {animal.map((animal) => (
                        <option value={animal.id}>{animal.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label"> Food </label>
                    <input
                        type="text"
                        className="form-control rounded-0"
                        id="inputName"
                        placeholder="Enter food name"
                        onChange={(e) => {
                            setFood({ ...food, name: e.target.value });
                            setEat({ ...eat, id_food: e.target.value });
                        }}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputQuantity" className="form-label"> Daily Consume </label>
                    <input
                        type="number"
                        className="form-control rounded-0"
                        id="inputQuantity"
                        placeholder="Enter quantity"
                        onChange={(e) => setEat({ ...eat, quantity: e.target.value })}
                    />
                </div>
                <div className="col-12">
                    <label for="inputInventory" className="form-label"> Inventory quantity </label>
                    <input type="number" className="form-control rounded-0" id="inputInventory"
                    placeholder="Enter food quantity"
                    onChange={(e) =>
                        setFood({ ...food, inventory_quantity: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputUnit" className="form-label"> Unit </label>
                    <input type="text" className="form-control rounded-0" id="inputUnit"
                    placeholder="Enter food unit"
                    onChange={(e) =>
                        setFood({ ...food, unit: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputPurchase" className="form-label"> Date Purchase </label>
                    <input type="text" className="form-control rounded-0" id="inputPurchase"
                    placeholder="yyyy/mm/dd"
                    autoComplete="off"
                    onChange={(e) =>
                        setFood({ ...food, date_purch: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputExpiry" className="form-label"> Date Expiry </label>
                    <input type="text" className="form-control rounded-0" id="inputExpiry"
                    placeholder="yyyy/mm/dd"
                    onChange={(e) =>
                        setFood({ ...food, date_expiry: e.target.value })
                    }
                    />
                </div>

                <button className='btn btn-primary w-100 rounded-0 mb-2'>Add zoo base</button>
            </form>
        </div>
    </div>
  )
}

export default AddFood