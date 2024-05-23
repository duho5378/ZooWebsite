import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditMedicalHistory() {
    const {id} = useParams()
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

      useEffect(()=> {
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

        axios.get('http://localhost:3000/auth/medical_history/'+id)
        .then(result => {
            setMedicalHistory({
                ...medicalHistory,
                id_animal: result.data.Result[0].id_animal,
                id_employee: result.data.Result[0].id_employee,
                diagnose: result.data.Result[0].diagnose,
                treatment: result.data.Result[0].treatment,
                day: result.data.Result[0].day,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_medical_history/'+id, medicalHistory)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/medical_history')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit medical history</h3>
        <form className="row g-1" onSubmit={handleSubmit}>

        <div className="col-12">
                    <label for="inputAnimal" className="form-label">
                    Animal
                    </label>
                    <select name="animal" id="inputAnimal" className="form-select"
                        onChange={(e) => setMedicalHistory({...animal, id_animal: e.target.value})}>
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
                        onChange={(e) => setMedicalHistory({...employee, id_employee: e.target.value})}>
                    {employee.map((d) => {
                        return <option value={d.id}>{d.id} | {d.first_name} {d.last_name}</option>;
                    })}
                    </select>
                </div>
                <div className="col-12">
                    <label for="inputDiagnose" className="form-label"> Diagnose </label>
                    <input type="text" className="form-control rounded-0" id="inputDiagnose"
                    placeholder="Enter medical diagnose"
                    value={medicalHistory.diagnose }
                    onChange={(e) =>
                        setMedicalHistory({ ...medicalHistory, diagnose: e.target.value })
                    }
                    />
                </div>
                <div className="col-12">
                    <label for="inputTreatment" className="form-label"> Treatment</label>
                    <input type="text" className="form-control rounded-0" id="inputTreatment"
                    placeholder="Enter medical treatment"
                    value={medicalHistory.treatment}
                    onChange={(e) =>
                        setMedicalHistory({ ...medicalHistory, treatment: e.target.value })
                    }
                    />
                </div>

                <div className="col-12">
                    <label for="inputDate" className="form-label"> Date </label>
                    <input type="text" className="form-control rounded-0" id="inputDate"
                    placeholder="yyyy/mm/dd"
                    value={medicalHistory.date}
                    onChange={(e) =>
                        setMedicalHistory({ ...medicalHistory, day: e.target.value })
                    }
                    />
                </div>
        
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Infrastructure
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditMedicalHistory