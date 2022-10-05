import axios from "axios";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AddEmployee.module.css";
import moment from 'moment';
import {Url } from "../constants/Global"

function AddUsers() {
  const router = useRouter();
   const [roles ,setRoles] = useState([]);
  const [addUsers, setUsers] = useState({
    lastName: "",
    firstName: "",
    uuid: "",
    Age: "",
    user_role_id:"",
    email_id:"",
    password: "",
    phone_no: "",
    created: moment().format( 'YYYY-MM-DD HH:mm:ss'),
  });

 
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(
      Url +`/api/users`,
      addUsers
    );
    if (data.data) router.push("/Users");
    setUsers({
        lastName: "",
        firstName: "",
        uuid: "",
        Age: "",
        user_role_id:"",
        email_id:"",
        password: "",
        phone_no: "",
        created: moment().format( 'YYYY-MM-DD HH:mm:ss'),
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("value", value);
    setUsers({ ...addUsers, [e.target.name]: value });
  };
  useEffect(function(){
    axios
    .get(Url +"/api/user_role")
    .then((response) => setRoles(response.data))
   
   },[]);
  return (
    <>
   
    
      <div className={styles.addform}>
        <h1 className={styles.h1}>ADD USERS</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className={styles.input}
              name="lastName"
              placeholder="Enter LastName"
              onChange={handleChange}
              value={addUsers.lastName}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="firstName"
              placeholder="Enter FirstName"
              onChange={handleChange}
              value={addUsers.firstName}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="uuid"
              placeholder="Enter Uuid"
              onChange={handleChange}
              value={addUsers.uuid}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="Age"
              placeholder="Enter Age"
              onChange={handleChange}
              value={addUsers.Age}
            />
            </div>
            <div>
            <input
              type="email_id"
              className={styles.input}
              name="email_id"
              placeholder="Enter Email_id"
              onChange={handleChange}
              value={addUsers.email_id}
            />
            </div>
            <div>
            <input
              type="text"
              className={styles.input}
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              value={addUsers.password}
            />
            </div>
            <div>
            <input
              type="text"
              className={styles.input}
              name="phone_no"
              placeholder="Enter Phone_no"
              onChange={handleChange}
              value={addUsers.phone_no}
            />
            
            <br/>
            <label>Roles</label>
            <br/>
               <select
                 type="text"
                 className={styles.input}
                 name="user_role_id"
                 placeholder="user_role_id"
                 onChange={handleChange}
                 value={addUsers.user_role_id}
        >
          {roles.map((role) =>(
                <option key={role.id} value={role.name}>
                    {role.name}
                    
                </option>
            ))}
              </select>
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

export default AddUsers;
