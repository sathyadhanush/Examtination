import axios from "axios";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AddEmployee.module.css";
import moment from 'moment';

function AddAnswers() {
  const router = useRouter();
  const [addAnswers, setAnswers] = useState({
    answers: "",
    question_id: "",
    iscurrect: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(
      `http://localhost:3000/api/answers`,
      addAnswers
    );
    if (data.data) router.push("/Answers");
    setAnswers({

     answers: "",
      question_id: "",
      iscurrect: "",
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("value", value);
    setAnswers({ ...addAnswers, [e.target.name]: value });
  };
   
  return (
    <>
      <div className={styles.addform}>
        <h1 className={styles.h1}>ADD ANSWERS</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className={styles.input}
              name="answers"
              placeholder="Enter answers"
              onChange={handleChange}
              value={addAnswers.answers}
            />
          </div>
          
          <div>
            <input
              type="text"
              className={styles.input}
              name="question_id"
              placeholder="Enter question_id"
              onChange={handleChange}
              value={addAnswers.question_id}
            />
             </div>
             <div>
            <input
              type="text"
              className={styles.input}
              name="iscurrect"
              placeholder="Enter iscurrect"
              onChange={handleChange}
              value={addAnswers.iscurrect}
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

export default AddAnswers;
