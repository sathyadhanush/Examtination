import axios from "axios";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AddEmployee.module.css";
import moment from 'moment';

function AddExams() {
  const router = useRouter();
   const [types ,setTypes] = useState([]);
   const [questions ,setQuestions] = useState([]);
  const [addExams, setExams] = useState({
    exam_name: "",
    exam_code: "",
    exam_uuid: "",
    noofquestions: "",
    timing:"",
    is_delete:"0",
    is_active: "1",
    exam_type_id: "",
    iscurrect: "true",

  });

 
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(
      `http://localhost:3000/api/exams`,
      addExams
    );
    if (data.data) router.push("/Exams");
    setExams({
      exam_name: "",
        exam_code: "",
        exam_uuid: "",
        noofquestions: "",
        timing:"",
        is_delete:"0",
        is_active: "1",
        exam_type_id: "",
        iscurrect: "true",
      
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("value", value);
    setExams({ ...addExams, [e.target.name]: value });
  };
  useEffect(function(){
    axios
    .get("http://localhost:3000/api/exam_type")
    .then((response) => setTypes(response.data))
   
   },[]);
   useEffect(function(){
    axios
    .get("http://localhost:3000/api/questions")
    .then((response) => setQuestions(response.data))
   
   },[]);
  return (
    <>
   
      <div className={styles.addform}>
      <label className={styles.label}>ADD EXAMS</label>
        <form onSubmit={onSubmit}>
          <div>
          <label className={styles.label}>Exam Type</label>

          <select

                 type="text"
                 className={styles.input}
                 name="exam_type_id"
                 placeholder="exam_type_id"
                 onChange={handleChange}
                 value={addExams.exam_type_id}
        >
          {types.map((type) =>(
                <option key={type.id} value={type.name}>
                    {type.name}
                    
                </option>
            ))}
              </select>
              <label className={styles.label}>Name</label>

            <input
              type="text"
              className={styles.input}
              name="exam_name"
              placeholder="Enter exam_name"
              onChange={handleChange}
              value={addExams.exam_name}
            />
          </div>
          <div>
          <label className={styles.label}>Exam_Code</label>

            <input
              type="text"
              className={styles.input}
              name="exam_code"
              placeholder="Enter exam_code"
              onChange={handleChange}
              value={addExams.exam_code}
            />
          </div>
          <label className={styles.label}>No OF Questions</label>

          <select className={styles.input}
  >
    <option value="a">10</option>
    <option selected value="b">20</option>
    <option value="c">30</option>
    <option value="d">40</option>
    <option value="e">50</option>

  </select>
            <div>
            <label className={styles.label}>Timing</label>
            <input
              type="text"
              className={styles.input}
              name="timing"
              placeholder="Enter timing"
              onChange={handleChange}
              value={addExams.timing}
            />
            </div> 
            <br></br>     
            <br/>
  
            <br/>
             
          <div>
          <button type="submit" className={styles.button}>
              Add Questions
            </button>
           
          </div>
        
        </form>
      </div>
     
    </>
  );
}

export default AddExams;
