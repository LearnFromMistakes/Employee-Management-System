import React, { useEffect } from "react";
import { useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
const EmployeeComponent = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const{id}=useParams();

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(()=>
  {
    if(id)
    {
      getEmployee(id).then((response) => 
      {
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setEmail(response.data.email);
      }).catch(error => {
        console.log(error)
      })
    }

  },[id])

  const navigator = useNavigate();

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstname, lastname, email };

      console.log(employee);

      if(id)
      {
        updateEmployee(id,employee).then((response)=>{
          console.log(response.data);
          navigator('/employees');
        }).catch(error =>{
          console.error(error);
        })
      }
      else{
        createEmployee(employee).then((response) => {
          console.log(response.data);
  
          navigator("/employees");
        }).catch(error => {
          console.error(error)
        })

      }

    }
  }

  function validateForm() {
    let valid = true;

    const errorCopy = { ...errors };

    if (firstname.trim()) {
      errorCopy.firstname = "";
    } else {
      errorCopy.firstname = "First name is required";
      valid = false;
    }
    if (lastname.trim()) {
      errorCopy.lastname = "";
    } else {
      errorCopy.lastname = "Last name is required";
      valid = false;
    }
    if (email.trim()) {
      errorCopy.email = "";
    } else {
      errorCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  }

  function pageTitle()
  {
    if(id){
      return <h2 className="text-center mt-2 mb-2">Update Employee</h2>
    }
    else{
      return <h2 className="text-center mt-2 mb-2">Add Employee</h2>
    }
  }

  return (
    <div className="container mt-2">
      <br />
      <br />
      <div className="row ">
        <div className="card col-md-6 offset-md-3 offset-md-3">

          {
            pageTitle()
          }

          <div className="card-body">
            <form action="#">
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Employee First Name"
                  name="firstname"
                  value={firstname}
                  className={`form-control ${errors.firstname ? 'is-invalid':''}`}
                  onChange={handleFirstName}
                />
                {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Employee Last Name"
                  name="lastname"
                  value={lastname}
                  className={`form-control ${errors.lastname ? 'is-invalid':''}`}
                  onChange={handleLastName}
                />
                {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid':''}`}
                  onChange={handleEmail}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
