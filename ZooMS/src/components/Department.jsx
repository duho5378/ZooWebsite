import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'

const Department = () => {

  const [category, setCategory] = useState([])

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Null";
    }
  
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const addDepartmentPath = isAdmin ? '/dashboard/add_department' : '/add_department';

  useEffect(()=> {
      axios.get('http://localhost:3000/auth/department')
      .then(result => {
          if(result.data.Status) {
            setCategory(result.data.Result);
          } else {
            alert(result.data.Error)
          }
      }).catch(err => console.log(err))
  }, [])
return (
  <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
          <h3>Department List</h3>
      </div>
      <Link to={addDepartmentPath} className='btn btn-primary'>Add Department</Link>
      <div className='mt-3'>
          <table className='table'>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Mananger</th>
                      <th>Inauguration day</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      category.map(c => (
                          <tr>
                              <td>{c.name}</td>
                              <td>{c.id_manager}</td>
                              <td>{formatDate(c.inauguration_day)}</td>
                          </tr>
                      ))
                  }
              </tbody>
          </table>
      </div>

  </div>
)
}

export default Department