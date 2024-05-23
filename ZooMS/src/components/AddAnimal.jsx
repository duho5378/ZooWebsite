import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddAnimal() {
    const [animal, setAnimal] = useState({
        id: "",
        name:"",
        birth: "",
        sex: "",
        day_arrive:"",
        health_status: "",
        origin: "",
        id_species: "",
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
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/auth/add_animal', animal)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/animal')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
            <h2>Add Animal</h2>
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <label for="inputName" className="form-label"> Name </label>
                    <input type="text" className="form-control rounded-0" id="inputName"
                    placeholder="Enter animal name"
                    onChange={(e) =>
                        setAnimal({ ...animal, name: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputBirth" className="form-label"> Birth </label>
                    <input type="text" className="form-control rounded-0" id="inputBirth"
                    placeholder="yyyy/mm/dd"
                    onChange={(e) =>
                        setAnimal({ ...animal, birth: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputSex" className="form-label"> Sex </label>
                    <input type="text" className="form-control rounded-0" id="inputSex"
                    placeholder="Enter animal gender"
                    onChange={(e) =>
                        setAnimal({ ...animal, sex: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputDay" className="form-label"> Day arrive </label>
                    <input type="text" className="form-control rounded-0" id="inputDay"
                    placeholder="yyyy/mm/dd"
                    onChange={(e) =>
                        setAnimal({ ...animal, day_arrive: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputHealth" className="form-label"> Health Status </label>
                    <input type="text" className="form-control rounded-0" id="inputHealth"
                    placeholder="Enter animal health status"
                    onChange={(e) =>
                        setAnimal({ ...animal, health_status: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputSpecies" className="form-label">
                    Origin
                    </label>
                    <select name="animal" id="inputSpecies" className="form-select"
                        onChange={(e) => setAnimal({...animal, origin: e.target.value})}>
                    {zoo.map((d) => {
                        return <option value={d.address}>{d.name}</option>;
                    })}
                    </select>
                </div>
                <div className="col-12">
                    <label for="inputSpecies" className="form-label">
                    Species Type
                    </label>
                    <select name="animal" id="inputSpecies" className="form-select"
                        onChange={(e) => setAnimal({...animal, id_species: e.target.value})}>
                    {species.map((d) => {
                        return <option value={d.id}>{d.name}</option>;
                    })}
                    </select>
                </div>
                <button className='btn btn-primary w-100 rounded-0 mb-2'>Add Animal</button>
            </form>
        </div>
    </div>
  )
}

export default AddAnimal