import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AddBuyFood() {
    const [buyFood, setBuyFood] = useState({
        id_food: "",
        quantity: "",
        unit_price: "",
    });
    
    const [food, setFood] = useState([]);    
    const navigate = useNavigate()

    useEffect(() => {
        axios
          .get("http://localhost:3000/auth/food")
          .then((result) => {
            if (result.data.Status) {
              setFood(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/auth/add_buy_food', buyFood)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/buy_food')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-2 rounded w-35 border'>
            <h2>Add Bill</h2>
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <label for="inputFood" className="form-label">
                    Food
                    </label>
                    <select name="buy_food" id="inputFood" className="form-select"
                        onChange={(e) => setBuyFood({...buyFood, id_food: e.target.value})}>
                    {food.map((d) => {
                        return <option value={d.id}>{d.name}</option>;
                    })}
                    </select>
                </div>
                <div className="col-12">
                    <label for="inputQuantity" className="form-label"> Quantity </label>
                    <input type="number" className="form-control rounded-0" id="inputQuantity"
                    placeholder="Enter Food Quantity"
                    onChange={(e) =>
                        setBuyFood({ ...buyFood, quantity: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputPrice" className="form-label"> Unit Price </label>
                    <input type="number" className="form-control rounded-0" id="inputPrice"
                    placeholder="Enter Unit Price"
                    onChange={(e) =>
                        setBuyFood({ ...buyFood, unit_price: e.target.value })
                    }
                    />
                </div>
                <button className='btn btn-primary w-100 rounded-0 mb-2'>Add Bill</button>
            </form>
        </div>
    </div>
  )
}

export default AddBuyFood