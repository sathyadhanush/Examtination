import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/UpdateEmployee.module.css";
import Layout from '../components/Layout'
function EditExam_Questions({ examQuesUpdateData }) {
  console.log("exam_questionsid", examQuesUpdateData);
  const router = useRouter();
  const [addExam_Questions, setExam_Questions] = useState({
    exam_id: "",
    question_id: "",
  });
  useEffect(() => {
    setExam_Questions(examQuesUpdateData[0]);
  }, [examQuesUpdateData]);
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(
      `http://localhost:3000/api/exam_questions/${examQuesUpdateData[0].id}`,
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
    <Layout>
    <label className={styles.label}>EXAM_QUESTIONS</label>
      <div className={styles.addform}>
        <h1 className={styles.h1}>EDIT EXAM_QUESTIONS</h1>
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
              placeholder="Enter question_id"
              onChange={handleChange}
              value={addExam_Questions.question_id}
            />
          </div>
        
          <div>
          </div>
          <div>
            <button type="submit" className={styles.button}>
              Submit
            </button>
            <button className={styles.button}>
              <Link href={`/Exam_Questions`}>Go Back</Link>
            </button>
          </div>
        </form>
      </div>
      </Layout>
    </>
  );
}

export default EditExam_Questions;
