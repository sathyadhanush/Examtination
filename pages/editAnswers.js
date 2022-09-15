import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/UpdateEmployee.module.css";
import Layout from '../components/Layout'
function EditAnswers({ answersUpdateData }) {
  console.log("answersid", answersUpdateData);
  const router = useRouter();
  const [addAnswers, setAnswers] = useState({
    name: "",
    image_url: "",
    question_id: "",
    iscurrect: "",
  });
  useEffect(() => {
    setAnswers(answersUpdateData[0]);
  }, [answersUpdateData]);
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(
      `http://localhost:3000/api/answers/${answersUpdateData[0].id}`,
      addAnswers
    );
    if (data.data) router.push("/Answers");
    setAnswers({
        name: "",
        image_url: "",
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
    <Layout>
    <label className={styles.label}>ANSWERS</label>
      <div className={styles.addform}>
        <h1 className={styles.h1}>EDIT ANSWERS</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className={styles.input}
              name="name"
              placeholder="Enter name"
              onChange={handleChange}
              value={addAnswers.name}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="image_url"
              placeholder="Enter image_url"
              onChange={handleChange}
              value={addAnswers.image_url}
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
          </div>
          <div>
            <button type="submit" className={styles.button}>
              Submit
            </button>
            <button className={styles.button}>
              <Link href={`/Answers`}>Go Back</Link>
            </button>
          </div>
        </form>
      </div>
      </Layout>
    </>
  );
}

export default EditAnswers;
