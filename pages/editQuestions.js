import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/UpdateEmployee.module.css";
import Layout from '../components/Layout'
function EditQuestions({ questionsUpdateData }) {
  console.log("questionsid", questionsUpdateData);
  const router = useRouter();
  const [types ,setTypes] = useState([]);
  const [addQuestions, setQuestions] = useState({
    name: "",
    image_url: "",
    question_type_id: "",
    is_delete: "",
    is_active:"",
    created:"",
  });
  useEffect(() => {
    setUsers(questionsUpdateData[0]);
  }, [questionsUpdateData]);
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(
      `http://localhost:3000/api/questions/${questionsUpdateData[0].id}`,
      addQuestions
    );
    if (data.data) router.push("/Questions");
    setQuestions({
        name: "",
        image_url: "",
        question_type_id: "",
        is_delete: "",
        is_active:"",
        created:"",
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
    <Layout>
    <label className={styles.label}>QUESTIONS</label>
      <div className={styles.addform}>
        <h1 className={styles.h1}>EDIT QUESTIONS</h1>
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
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="image_url"
              placeholder="Enter image_url"
              onChange={handleChange}
              value={addQuestions.image_url}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="is_delete"
              placeholder="Enter is_delete"
              onChange={handleChange}
              value={addQuestions.is_delete}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="is_active"
              placeholder="Enter is_active"
              onChange={handleChange}
              value={addQuestions.is_active}
            />
          </div>
         
         
          <div>
            <input
              type="text"
              className={styles.input}
              name="created"
              placeholder="Enter created"
              onChange={handleChange}
              value={addQuestions.created}
            />
          <select
              type="text"
              className={styles.input}
              name="question_type_id"
              placeholder="Question Type ID"
              onChange={handleChange}
              value={addQuestions.question_type_id}
            >
                {types.map((type) =>(
                <option value={type.name} key={type.id}>
                    {type.name}
                    
                </option>
            ))}
            </select>
          </div>
          <div>
            <button type="submit" className={styles.button}>
              Submit
            </button>
            <button className={styles.button}>
              <Link href={`/Questions`}>Go Back</Link>
            </button>
          </div>
        </form>
      </div>
      </Layout>
    </>
  );
}

export default EditQuestions;
