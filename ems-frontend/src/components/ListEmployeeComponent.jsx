import React,{useEffect, useState} from 'react'
import { deleteEmployee, listemployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

     const [employees,setEmployees] = useState([])

     const navigator = useNavigate();

     useEffect(()=>{
        getAllemployee()
     },[])

    function getAllemployee(){
        listemployees().then((response) =>
            {
                setEmployees(response.data);
            }).catch(error =>
            {
                console.error(error);
            }
            ) 
    }

     function addNewEmployee()
     {
        navigator('/add-employee')
     }

     function updateEmployee(id)
     {
        navigator(`/edit-employee/${id}`)
     }

     function removeEmployee(id)
     {
        deleteEmployee(id).then((response) => {
            getAllemployee()
        }).catch(error => {
            console.error(error)
        })
     }

  return (
    <div className='container'>

        <h2 className='text-center '>List of Employees</h2>
        <button className='btn btn-primary mb-3 ' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr className='text-center'>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map (employee => 
                        <tr key = {employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=> updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger ms-2' onClick={()=> removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>

    </div>
  )
}

export default ListEmployeeComponent