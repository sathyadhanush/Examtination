import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/UpdateEmployee.module.css";
import Layout from '../components/Layout'
import { Radio } from '@nextui-org/react';

function EditQuestions({ questionsUpdateData }) {
  console.log("questionsid", questionsUpdateData);
  const router = useRouter();
  const [types ,setTypes] = useState([]);
  const [addQuestions, setQuestions] = useState({
    name: "",
    question_type_id: "",
    is_delete:"",
    is_active:"",
    created: "",
    answers:"",

  });
  useEffect(() => {
    setQuestions(questionsUpdateData[0]);
  }, [questionsUpdateData]);
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(
      `http://localhost:3000/api/questions/${questionsUpdateData[0].id}`,
      addQuestions
    );
    if (data.data) router.push("/questions");
    setQuestions({
      name: "",
      question_type_id: "",
      is_delete:"",
      is_active:"",
      created: "",
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
    <Layout>
    <label className={styles.label}>QUESTIONS</label>
      <div className={styles.addform}>
        <h1 className={styles.h1}>EDIT QUESTIONS</h1>
        <form onSubmit={onSubmit}>
          <div>
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
          <h1 className={styles.h1}>EDIT ANSWERS</h1>
          <Radio.Group label="Options" defaultValue="A">
          <Radio value="A"> <input
           type="text"
           className={styles.input}
           name="answers"
           placeholder="Enter answers"
           onChange={handleChange}
           value={addQuestions.answers}
           /></Radio>
      
           </Radio.Group>       
           </div>
          
          <div>
            <button type="submit" className={styles.button}>
              Submit
            </button>
            <button className={styles.button}>
              <Link href={`/questions`}>Go Back</Link>
            </button>
          </div>
        </form>
      </div>
      </Layout>
    </>
  );
}

export default EditQuestions;
