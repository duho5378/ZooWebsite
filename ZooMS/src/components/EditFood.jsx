import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditFood() {
    const {id} = useParams()
    const [food, setFood] = useState({
        name:"",
        inventory_quantity: "",
        unit: "",
        date_purch: "",
        date_expiry: "",
    });
    
    const [species, setSpecies] = useState([]);    
    const [zoo, setZoo] = useState([]);   
    const navigate = useNavigate()

    useEffect(() => {
        axios
          .get("http://localhost:3000/auth/species")
          .then((result) => {
            if (result.data.Status) {
                setSpecies(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));

        axios
          .get("http://localhost:3000/auth/zoo")
          .then((result) => {
            if (result.data.Status) {
              setZoo(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));

        axios.get('http://localhost:3000/auth/food/'+id)
        .then(result => {
            setFood({
                ...food,
                name: result.data.Result[0].name,
                inventory_quantity: result.data.Result[0].inventory_quantity,
                unit: result.data.Result[0].unit,
                date_purch: result.data.Result[0].date_purch,
                date_expiry: result.data.Result[0].date_expiry,
            })
        }).catch(err => console.log(err))
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_food/'+id, food)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/food')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Feeding</h3>
            <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
                    <label for="inputName" className="form-label"> Name </label>
                    <input type="text" className="form-control rounded-0" id="inputName"
                    placeholder="Enter food name"
                    value={food.name}
                    onChange={(e) =>
                        setFood({ ...food, name: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputInventory" className="form-label"> Inventory quantity </label>
                    <input type="number" className="form-control rounded-0" id="inputInventory"
                    placeholder="Enter food quantity"
                    value={food.inventory_quantity} 
                    onChange={(e) =>
                        setFood({ ...food, inventory_quantity: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputUnit" className="form-label"> Unit </label>
                    <input type="text" className="form-control rounded-0" id="inputUnit"
                    placeholder="Enter food unit"
                    value={food.unit}
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
                    value={food.date_purch}
                    onChange={(e) =>
                        setFood({ ...food, date_purch: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputExpiry" className="form-label"> Date Expiry </label>
                    <input type="text" className="form-control rounded-0" id="inputExpiry"
                    placeholder="yyyy/mm/dd"
                    value={food.date_expiry} 
                    onChange={(e) =>
                        setFood({ ...food, date_expiry: e.target.value })
                    }
                    />
                </div>
                <button className='btn btn-primary w-100 rounded-0 mb-2'>Edit Food</button>
            </form>
        </div>
    </div>
  )
}

export default EditFood