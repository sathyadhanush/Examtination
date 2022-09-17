import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/EmployeeList.module.css";
import axios from "axios"
import Layout from '../components/Layout'
import Answersaction from "./answersAction";
import AnswersEditAction from "./answersEditAction";
function Home({ data }) {
  console.log("data", data);
  const router = useRouter();
  const deleteAnswers = async (id) => {
   
    let text = "Delete Answers List ";
    if (confirm(text) == true) {
      let data = await axios.delete(`http://localhost:3000/api/answers/${id}`);
      router.push("/Answers");
    } else {
      console.log( "You canceled!")
    }
   
  };
  return (
    <div>
       <Layout>
       <label className={styles.label}>ANSWERS</label>
    <div className={styles.cols}>
    
      <table className={styles.table}>
        <thead className={styles.thead}>  
          <tr>
            <th className={styles.th}>Id</th>
            <th className={styles.th}>Name1</th>
            <th className={styles.th}>Name2</th>
            <th className={styles.th}>Name3</th>
            <th className={styles.th}>Name4</th>
            <th className={styles.th}>Question_Id</th>
            <th className={styles.th}>Iscurrect</th>

            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((ansData, index) => (
            <tr key={index}>
              <th className={styles.th}>{index + 1}</th>
              <td className={styles.th}>{ansData.name1}</td>
              <td className={styles.th}>{ansData.name2}</td>
              <td className={styles.th}>{ansData.name3}</td>
              <td className={styles.th}>{ansData.name4}</td>
              <td className={styles.th}>{ansData.question_id}</td>
              <td className={styles.th}>{ansData.iscurrect}</td>
              <td className={styles.btn__cols}>
                <button
                  className={styles.delete}
                  onClick={() => deleteAnswers(ansData.id)}
                 
                >
                  Delete
                
                </button>
                <button className={styles.update}>
                 <Link href={`/answers/${ansData.id}`}>Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <center><Answersaction/></center>
     
    </div>
    </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/answers");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Home;