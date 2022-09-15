import axios from "axios";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AddEmployee.module.css";
import moment from 'moment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function AddQuestions() {
  const router = useRouter();
   const [types ,setTypes] = useState([]);
  const [addQuestions, setQuestions] = useState({
    name: "",
    question_type_id: "",
    answers:"",
  });
  
 
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(
      `http://localhost:3000/api/questions`,
      addQuestions
    );
    if (data.data) router.push("/questions");
    setQuestions({
        name: "",
        question_type_id: "",
        answers:"",
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("value", value);
    setQuestions({ ...addQuestions, [e.target.name]: value });
  };
  useEffect(function(){
    axios
    .get("http://localhost:3000/api/question_type")
    .then((response) => setTypes(response.data))
   
   },[]);
  return (
    <>
   
    
      <div className={styles.addform}>
        <h1 className={styles.h1}>ENTER QUESTIONS</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className={styles.input}
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
              value={addQuestions.name}
            />
              
            <br/>
            <label>Types</label>
            <br/>
           
               <select
                 type="text"
                 className={styles.input}
                 name="question_type_id"
                 placeholder="question_type_id"
                 onChange={handleChange}
                 value={addQuestions.question_type_id}
        >
          {types.map((type) =>(
                <option key={type.id} value={type.name}>
                    {type.name}
                    
                </option>
            ))}
              </select>
              <h1 className={styles.h1}>ANSWERS</h1>
       
           </div>
           <div>
            <input
              type="text"
              className={styles.input}
              name="answers"
              placeholder="Enter answer"
              onChange={handleChange}
              value={addQuestions.answers}
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

export default AddQuestions;
