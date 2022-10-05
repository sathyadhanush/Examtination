import axios from "axios";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AddEmployee.module.css";
import moment from 'moment';

function AddExam_Questions() {
  const router = useRouter();
  const [addExam_Questions, setExam_Questions] = useState({
    exam_id: "",
    question_id: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(
      `http://localhost:3000/api/exam_questions`,
      addExam_Questions
    );
    if (data.data) router.push("/Exam_Questions");
    setExam_Questions({
        exam_id: "",
        question_id: "",
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("value", value);
    setExam_Questions({ ...addExam_Questions, [e.target.name]: value });
  };
   
  return (
    <>
      <div className={styles.addform}>
        <h1 className={styles.h1}>ADD EXAM_QUESTIONS</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className={styles.input}
              name="exam_id"
              placeholder="Enter Exam_Id"
              onChange={handleChange}
              value={addExam_Questions.exam_id}
            />
          </div>
          
          <div>
            <input
              type="text"
              className={styles.input}
              name="question_id"
              placeholder="Enter Question_Id"
              onChange={handleChange}
              value={addExam_Questions.question_id}
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

export default AddExam_Questions;
