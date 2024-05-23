import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddZoo() {
    const [zoo, setZoo] = useState({
        address:"",
        name: "",
        phone_number: "",
        email: "",
        city: "",
        country: "",
    });
      
    const navigate = useNavigate()


    
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/auth/add_zoo', zoo)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/zoo')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-2 rounded w-35 border'>
            <h2>Add New Zoo</h2>
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <label for="inputAddress" className="form-label"> Address </label>
                    <input type="text" className="form-control rounded-0" id="Address"
                    placeholder="Enter zoo address"
                    onChange={(e) =>
                        setZoo({ ...zoo, address: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputName" className="form-label"> Name </label>
                    <input type="text" className="form-control rounded-0" id="inputName"
                    placeholder="Enter zoo name"
                    onChange={(e) =>
                        setZoo({ ...zoo, name: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputPhone" className="form-label"> Phone Number </label>
                    <input type="text" className="form-control rounded-0" id="inputPhone"
                    placeholder="Enter phone number"
                    onChange={(e) =>
                        setZoo({ ...zoo, phone_number: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputEmail4" className="form-label"> email </label>
                    <input type="email" className="form-control rounded-0" id="inputEmail4"
                    placeholder="Enter email"
                    autoComplete="off"
                    onChange={(e) =>
                        setZoo({ ...zoo, email: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputCity" className="form-label"> City </label>
                    <input type="text" className="form-control rounded-0" id="inputCity"
                    placeholder="Enter email"
                    onChange={(e) =>
                        setZoo({ ...zoo, city: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputCountry" className="form-label"> Country </label>
                    <input type="text" className="form-control rounded-0" id="inputCountry"
                    placeholder="Enter zoo country"
                    onChange={(e) =>
                        setZoo({ ...zoo, country: e.target.value })
                    }
                    />
                </div>
                <button className='btn btn-primary w-100 rounded-0 mb-2'>Add zoo base</button>
            </form>
        </div>
    </div>
  )
}

export default AddZoo