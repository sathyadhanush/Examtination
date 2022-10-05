

import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/EmployeeList.module.css";
import axios from "axios"
import Layout from '../components/Layout'
import Exam_Questionsaction from "./exam_questionsAction";
import Exam_QuestionsEditAction from "./exam_questionsAction";
function Home({ data }) {
  console.log("data", data);
  const router = useRouter();
  const deleteExamQuestions = async (id) => {
   
    let text = "Delete Exam_Questions List ";
    if (confirm(text) == true) {
      let data = await axios.delete(`http://localhost:3000/api/exam_questions/${id}`);
      router.push("/Exam_Questions");
    } else {
      console.log( "You canceled!")
    }
   
  };
  return (
    <div>
       <Layout>
       <label className={styles.label}>EXAM_QUESTIONS</label>
    <div className={styles.cols}>
    
      <table className={styles.table}>
        <thead className={styles.thead}>  
          <tr>
            <th className={styles.th}>Id</th>
            <th className={styles.th}>Exam_Id</th>
            <th className={styles.th}>Question_Id</th>

            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((examQuesData, index) => (
            <tr key={index}>
              <th className={styles.th}>{index + 1}</th>
             
              <td className={styles.th}>{examQuesData.exam_id}</td>
              <td className={styles.th}>{examQuesData.question_id}</td>
              <td className={styles.btn__cols}>
                <button
                  className={styles.delete}
                  onClick={() => deleteExamQuestions(examQuesData.id)}
                 
                >
                  Delete
                
                </button>
                <button className={styles.update}>
                 <Link href={`/exam_questions/${examQuesData.id}`}>Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <center><Exam_Questionsaction/></center>
     
    </div>
    </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/exam_questions");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Home;