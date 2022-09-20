

import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/EmployeeList.module.css";
import axios from "axios"
import Layout from '../components/Layout'
import Questionsaction from "./questionsAction";
import QuestionsEditAction from "./questionsEditAction";
import {Url } from "../constants/Global"

function Home({ data }) {
  console.log("data", data);
  const router = useRouter();
  const deleteQuestions = async (id) => {
   
    let text = "Delete Quetions List ";
    if (confirm(text) == true) {
      let data = await axios.delete(Url +`/api/questions/${id}`);
      router.push("/questions");
    } else {
      console.log( "You canceled!")
    }
   
  };
  return (
    <div>
       <Layout>
       <label className={styles.label}>QUESTIONS</label>
    <div className={styles.cols}>
    
      <table className={styles.table}>
        <thead className={styles.thead}>  
          <tr>
            <th className={styles.th}>Id</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Question_Type_Id</th>
            <th className={styles.th}>Is_Delete</th>
            <th className={styles.th}>Is_Active </th>
            <th className={styles.th}>Created </th>

            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((questionsData, index) => (
            <tr key={index}>
              <th className={styles.th}>{index + 1}</th>
              <td className={styles.th}>{questionsData.name}</td>
              <td className={styles.th}>{questionsData.question_type_id}</td>
              <td className={styles.th}>{questionsData.is_delete}</td>
              <td className={styles.th}>{questionsData.is_active}</td>
              <td className={styles.th}>{questionsData.created}</td>

              <td className={styles.btn__cols}>
                <button
                  className={styles.delete}
                  onClick={() => deleteQuestions(questionsData.id)}
                 
                >
                  Delete
                
                </button>
                <button className={styles.update}>
                 <Link href={`/questions/${questionsData.id}`}>Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <center><Questionsaction/></center>
     
    </div>
    </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(Url +"/api/questions");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Home;