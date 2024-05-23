import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditBuyFood() {
    const {id} = useParams()
    const [buyFood, setBuyFood] = useState({
        id_food: "",
        quantity: "",
        unit_price: "",
      });
      const [food, setFood] = useState([]);   
      const navigate = useNavigate()

      useEffect(()=> {
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

        axios.get('http://localhost:3000/auth/buy_food/'+id)
        .then(result => {
            setBuyFood({
                ...buyFood,
                id_food: result.data.Result[0].id_food,
                quantity: result.data.Result[0].quantity,
                unit_price: result.data.Result[0].unit_price,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_buy_food/'+id, buyFood)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/buy_food')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Food Bill</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
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
                    value={buyFood.quantity}
                    onChange={(e) =>
                        setBuyFood({ ...buyFood, quantity: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputPrice" className="form-label"> Unit Price </label>
                    <input type="number" className="form-control rounded-0" id="inputPrice"
                    placeholder="Enter Unit Price"
                    value={buyFood.unit_price}
                    onChange={(e) =>
                        setBuyFood({ ...buyFood, unit_price: e.target.value })
                    }
                    />
                </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Food Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default EditBuyFood