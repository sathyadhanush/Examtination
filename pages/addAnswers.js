import axios from "axios";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AddEmployee.module.css";
import moment from 'moment';

function AddAnswers() {
  const router = useRouter();
  const [addAnswers, setAnswers] = useState({
    name1: "",
    name2: "",
    name3: "",
    name4: "",
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
      name1: "",
      name2: "",
      name3: "",
      name4: "",
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
              name="name1"
              placeholder="Enter name1"
              onChange={handleChange}
              value={addAnswers.name1}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="name2"
              placeholder="Enter name2"
              onChange={handleChange}
              value={addAnswers.name2}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="name3"
              placeholder="Enter name3"
              onChange={handleChange}
              value={addAnswers.name3}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="name4"
              placeholder="Enter name4"
              onChange={handleChange}
              value={addAnswers.name4}
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
