import axios from "axios";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AddEmployee.module.css";
import moment from 'moment';
import { Radio } from '@nextui-org/react';


function AddQuestions() {
  const router = useRouter();
   const [types ,setTypes] = useState([]);
  const [addQuestions, setQuestions] = useState({
    name: "",
    question_type_id: "",
    is_delete:"",
    is_active:"",
    created: moment().format( 'YYYY-MM-DD HH:mm:ss'),
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
      is_delete:"",
      is_active:"",
      created: moment().format( 'YYYY-MM-DD HH:mm:ss'),
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
            <input
              type="text"
              className={styles.input}
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
              value={addQuestions.name}
            />
            <input
              type="text"
              className={styles.input}
              name="is_delete"
              placeholder="delete"
              onChange={handleChange}
              value={addQuestions.is_delete}
            />
              <input
              type="text"
              className={styles.input}
              name="is_active"
              placeholder="active"
              onChange={handleChange}
              value={addQuestions.is_active}
            />
           
           
            <br/>
            
              <h1 className={styles.h1}>ENTER ANSWERS</h1>

              
           </div>
           <Radio.Group label="Options" defaultValue="A">
          <Radio value="A"> <input
           type="text"
           className={styles.input}
           name="answers"
           placeholder="Enter answers"
           onChange={handleChange}
           value={addQuestions.answers}
           /></Radio>
             <Radio value="B" > <input
           type="text"
           className={styles.input}
           name="answers"
           placeholder="Enter answers"
           value={addQuestions.answers}
           onChange={handleChange}
           /></Radio>
      <Radio value="C" > <input
           type="text"
           className={styles.input}
           name="answers"
           placeholder="Enter answers"
           value={addQuestions.answers}
           onChange={handleChange}
           /></Radio>
      <Radio value="D" > <input
           type="text"
           className={styles.input}
           name="answers"
           placeholder="Enter answers"
           value={addQuestions.answers}
           onChange={handleChange}
           /></Radio>
           </Radio.Group>     
          
          
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
