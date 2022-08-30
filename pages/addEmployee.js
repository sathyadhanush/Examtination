import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AddEmployee.module.css";
import Link from "next/link";
import Layout from '../components/Layout'

function AddEmployee() {
  const router = useRouter();
  const [addEmployee, setEmployee] = useState({
    emp_name: "",
    emp_email: "",
    emp_address: "",
    emp_phone: "",
    role_id:"",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(
      `http://localhost:3000/api/employee`,
      addEmployee
    );
    if (data.data) router.push("/Employee");
    setEmployee({
      emp_name: "",
      emp_email: "",
      emp_address: "",
      emp_phone: "",
      role_id:"",
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("value", value);
    setEmployee({ ...addEmployee, [e.target.name]: value });
  };
  return (
    <>
   
    
      <div className={styles.addform}>
        <h1 className={styles.h1}>ADD EMPLOYEE</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className={styles.input}
              name="emp_name"
              placeholder="Enter Name"
              onChange={handleChange}
              value={addEmployee.emp_name}
            />
          </div>
          <div>
            <input
              type="email"
              className={styles.input}
              name="emp_email"
              placeholder="Enter Email"
              onChange={handleChange}
              value={addEmployee.emp_email}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="emp_address"
              placeholder="Enter Address"
              onChange={handleChange}
              value={addEmployee.emp_address}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="emp_phone"
              placeholder="Enter Phone"
              onChange={handleChange}
              value={addEmployee.emp_phone}
            />
              <input
              type="text"
              className={styles.input}
              name="role_id"
              placeholder="Role Id"
              onChange={handleChange}
              value={addEmployee.role_id}
            />
          </div>
          <div>
          <button type="submit" className={styles.button}>
              Submit
            </button>
           
          </div>
        
        </form>
      </div>
     
    </>
  );
}

export default AddEmployee;
