import axios from "axios";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AddEmployee.module.css";
import Select from '@material-ui/core/Select';

function AddEmployee() {
  const router = useRouter();
  const [role_id ,setRole_id] = useState([]);
  const [roles ,setRoles] = useState([]);
  const [addEmployee, setEmployee] = useState({
    emp_name: "",
    emp_email: "",
    emp_address: "",
    emp_phone: "",
    role_id:"",
   
  });

 const [opens,setOpens]=useState("");
  const handleCloses = () => {
    setOpens(false);
  };

  const handleOpens = () => {
    setOpens(true);
  };
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
  useEffect(function(){
    axios
    .get("http://localhost:3000/api/employeerole")
    .then((response) => setRoles(response.data))
   
   },[]);
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
            /><br/>
            <label>Roles</label>
            <br/>
               <Select
               className={styles.Select}
          open={opens}
          onClose={handleCloses}
          onOpen={handleOpens}
          value={role_id} 
          onChange={(e)=>{setRole_id(e.target.value)}}
        >
          {roles.map((role) =>(
                <option key={role.name} value={role.id}>
                    {role.name}
                    
                </option>
            ))}
              </Select>
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
