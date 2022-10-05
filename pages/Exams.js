import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../styles/EmployeeList.module.css"
import axios from "axios"
import Layout from '../components/Layout'
import Examsaction from "./examsAction"
import Showquestionsaction from "./showQuestionsAction"
function Home({ data }) {
  console.log("data", data);
  const router = useRouter();
  const deleteExams = async (id) => {
   
    let text = "Delete Exams List ";
    if (confirm(text) == true) {
      let data = await axios.delete(`http://localhost:3000/api/exams/${id}`);
      router.push("/Exams");
    } else {
      console.log( "You canceled!")
    }
   
  };
  return (
    <div>
       <Layout>
       <label className={styles.label}>EXAMS</label>
    <div className={styles.cols}>
    
      <table className={styles.table}>
        <thead className={styles.thead}>  
          <tr>
            <th className={styles.th}>Id</th>
            <th className={styles.th}>Exam_Name</th>
            <th className={styles.th}>Exam_Code</th>
            <th className={styles.th}>Exam_Uuid</th>
            <th className={styles.th}>Noofquestions </th>
            <th className={styles.th}>Timing</th>
            <th className={styles.th}>Is_Delete </th>
            <th className={styles.th}>Is_Active </th>
            <th className={styles.th}>Exam_Type_Id </th>
            <th className={styles.th}>Iscurrect </th>

                 <th className={styles.th}>Questions</th>

            <th className={styles.th}>Actions</th>

          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((examsData, index) => (
            <tr key={index}>
              <th className={styles.th}>{index + 1}</th>
              <td className={styles.th}>{examsData.exam_name}</td>
              <td className={styles.th}>{examsData.exam_code}</td>
              <td className={styles.th}>{examsData.exam_uuid}</td>
              <td className={styles.th}>{examsData.noofquestions}</td>
              <td className={styles.th}>{examsData.timing}</td>
              <td className={styles.th}>{examsData.is_delete}</td>
              <td className={styles.th}>{examsData.is_active}</td>
              <td className={styles.th}>{examsData.exam_type_id}</td>
              <td className={styles.th}>{examsData.iscurrect}</td>
              
              <td className={styles.th}>
             <Showquestionsaction/>
              </td>
              <td className={styles.btn__cols}>
                <button
                  className={styles.delete}
                  onClick={() => deleteExams(examsData.id)}
                 
                >
                  Delete
                
                </button>
                <button className={styles.update}>
                 <Link href={`/exams/${examsData.id}`}>Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <center><Examsaction/></center>
     
    </div>
    </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/exams");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Home;