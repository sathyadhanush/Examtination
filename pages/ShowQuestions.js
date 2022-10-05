import { useRouter } from "next/router";
import styles from "../styles/EmployeeList.module.css";
import Showquestionsaction from "./showQuestionsAction"

import Layout from '../components/Layout'

import {Url } from "../constants/Global";

function Home({ data }) {
  console.log("data", data);
  const router = useRouter();
  
  return (
    <div>
       <Layout>
    <div className={styles.cols}>
    
      <table className={styles.table}>
        <thead className={styles.thead}>  
          <tr>
            <th className={styles.th}>Question_Type</th>
            <th className={styles.th}>Questions</th>
            
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((Showquesdata, index) => (
            <tr key={index}>
              <th className={styles.th}>{index + 1}</th>
              <td className={styles.th}>{Showquesdata.question_type}</td>
              <td className={styles.th}>{Showquesdata.questions}</td>
              
              <td className={styles.btn__cols}>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <center><Showquestionsaction/></center>

    </div>
    </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(Url +"/api/exams");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Home;