import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AddMedicalHistory() {
    const [medicalHistory, setMedicalHistory] = useState({
        id_animal:"",
        id_employee: "",
        diagnose: "",
        treatment: "",
        day: "",
    });
      
    const [employee, setEmployee] = useState([]);   
    const [animal, setAnimal] = useState([]);    
    const navigate = useNavigate()


    useEffect(() => {
        axios
          .get("http://localhost:3000/auth/employee")
          .then((result) => {
            if (result.data.Status) {
              setEmployee(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
        axios
          .get("http://localhost:3000/auth/animal")
          .then((result) => {
            if (result.data.Status) {
              setAnimal(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/auth/add_medical_history', medicalHistory)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/medical_history')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-2 rounded w-35 border'>
            <h2>Add New Medical History</h2>
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <label for="inputAnimal" className="form-label">
                    Animal
                    </label>
                    <select name="animal" id="inputAnimal" className="form-select"
                        onChange={(e) => setMedicalHistory({...medicalHistory, id_animal: e.target.value})}>
                    {animal.map((d) => {
                        return <option value={d.id}>{d.id} | {d.name}</option>;
                    })}
                    </select>
                </div>
                <div className="col-12">
                    <label for="inputEmployee" className="form-label">
                    Employee
                    </label>
                    <select name="employee" id="inputEmployee" className="form-select"
                        onChange={(e) => setMedicalHistory({...medicalHistory, id_employee: e.target.value})}>
                    {employee.map((d) => {
                        return <option value={d.id}>{d.id} | {d.first_name} {d.last_name}</option>;
                    })}
                    </select>
                </div>
                <div className="col-12">
                    <label for="inputDiagnose" className="form-label"> Diagnose </label>
                    <input type="text" className="form-control rounded-0" id="inputDiagnose"
                    placeholder="Enter medical diagnose"
                    onChange={(e) =>
                        setMedicalHistory({ ...medicalHistory, diagnose: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputTreatment" className="form-label"> Treatment</label>
                    <input type="text" className="form-control rounded-0" id="inputTreatment"
                    placeholder="Enter medical treatment"
                    onChange={(e) =>
                        setMedicalHistory({ ...medicalHistory, treatment: e.target.value })
                    }
                    />
                </div>

                <div className="col-12">
                    <label for="inputDate" className="form-label"> Date </label>
                    <input type="text" className="form-control rounded-0" id="inputDate"
                    placeholder="yyyy/mm/dd"
                    onChange={(e) =>
                        setMedicalHistory({ ...medicalHistory, day: e.target.value })
                    }
                    />
                </div>
                <button className='btn btn-primary w-100 rounded-0 mb-2'>Add medical check-up</button>
            </form>
        </div>
    </div>
  )
}
export default AddMedicalHistory