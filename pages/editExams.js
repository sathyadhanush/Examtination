import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/UpdateEmployee.module.css";
import Layout from '../components/Layout'
function EditExams({ examsUpdateData }) {
  console.log("examsid", examsUpdateData);
  const router = useRouter();
  const [types ,setTypes] = useState([]);
  const [questions ,setQuestions] = useState([]);
  const [addExams, setExams] = useState({
    exam_name: "",
    exam_code: "",
    exam_uuid: "",
    noofquestions: "",
    timing:"",
    is_delete:"",
    is_active: "",
    exam_type_id: "",
    iscurrect: "",
  });
  useEffect(() => {
    setExams(examsUpdateData[0]);
  }, [examsUpdateData]);
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(
      `http://localhost:3000/api/exams/${examsUpdateData[0].id}`,
      addExams
    );
    if (data.data) router.push("/Exams");
    setExams({
      exam_name: "",
        exam_code: "",
        exam_uuid: "",
        noofquestions: "",
        timing:"",
        is_delete:"",
        is_active: "",
        exam_type_id: "",
        iscurrect: "",
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
    <Layout>
    <label className={styles.label}>EXAMS</label>
      <div className={styles.addform}>
        <h1 className={styles.h1}>EDIT EXAMS</h1>
        <form onSubmit={onSubmit}>
          <div>
          <label className={styles.label}>Exam_Type_Id</label>

          <select
              type="text"
              className={styles.input}
              name="exam_type_id"
              placeholder="Exam Type ID"
              onChange={handleChange}
              value={addExams.exam_type_id}
            >
                {types.map((type) =>(
                <option value={type.name} key={type.id}>
                    {type.name}
                    
                </option>
            ))}
            </select>
            </div>

          <div>
          <label className={styles.label}>Name</label>

            <input
              type="text"
              className={styles.input}
              name="exam_name"
              placeholder="Enter exam_name"
              onChange={handleChange}
              value={addExams.name}
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
          <div>
          <label className={styles.label}>No_OF_Questions</label>

          <select className={styles.input}
  >
    <option value="a">10</option>
    <option selected value="b">20</option>
    <option value="c">30</option>
    <option value="d">40</option>
    <option value="e">50</option>

     </select>
      </div>
          <div>
          <label className={styles.label}>Timing </label>


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
           
          
          <div>
            <button type="submit" className={styles.button}>
              Submit
            </button>
            <button className={styles.button}>
              <Link href={`/Exams`}>Go Back</Link>
            </button>
          </div>
        </form>
      </div>
      </Layout>
    </>
  );
}

export default EditExams;
