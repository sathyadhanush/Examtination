import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/UpdateEmployee.module.css";
import Layout from '../components/Layout'
function EditUsers({ usersUpdateData }) {
  console.log("usersid", usersUpdateData);
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
    created: "",
  });
  useEffect(() => {
    setUsers(usersUpdateData[0]);
  }, [usersUpdateData]);
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(
      `http://localhost:3000/api/users/${usersUpdateData[0].id}`,
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
        created: "",
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("value", value);
    setUsers({ ...addUsers, [e.target.name]: value });
  };
  useEffect(function(){
    axios
    .get("http://localhost:3000/api/user_role")
    .then((response) => setRoles(response.data))
   
   },[]);
  return (
    <>
    <Layout>
    <label className={styles.label}>USERS</label>
      <div className={styles.addform}>
        <h1 className={styles.h1}>EDIT USERS</h1>
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
          <div>
            <input
              type="text"
              className={styles.input}
              name="phone_no"
              placeholder="Enter Phone_no"
              onChange={handleChange}
              value={addUsers.phone_no}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="creatrd"
              placeholder="Enter Created"
              onChange={handleChange}
              value={addUsers.created}
            />
          </div>
          <select
              type="text"
              className={styles.input}
              name="user_role_id"
              placeholder="User Role ID"
              onChange={handleChange}
              value={addUsers.user_role_id}
            >
                {roles.map((role) =>(
                <option value={role.name} key={role.id}>
                    {role.name}
                    
                </option>
            ))}
            </select>
          </div>
          <div>
            <button type="submit" className={styles.button}>
              Submit
            </button>
            <button className={styles.button}>
              <Link href={`/Users`}>Go Back</Link>
            </button>
          </div>
        </form>
      </div>
      </Layout>
    </>
  );
}

export default EditUsers;
