import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/EmployeeList.module.css";
import axios from "axios"
import Layout from '../components/Layout'
import Employeeaction from "./employeeAction";
import EmployeeEditAction from "./employeeEditAction";
function Home({ data }) {
  console.log("data", data);
  const router = useRouter();
  const deleteEmployee = async (id) => {
    let data = await axios.delete(`http://localhost:3000/api/employee/${id}`);
    router.push("/Employee");
  };
  return (
    <div>
       <Layout>
       <label className={styles.label}>EMPLOYEE</label>
    <div className={styles.cols}>
    
      <table className={styles.table}>
        <thead className={styles.thead}>  
          <tr>
            <th className={styles.th}>EmployeeId</th>
            <th className={styles.th}>EmployeeName</th>
            <th className={styles.th}>EmployeeEmail</th>
            <th className={styles.th}>EmployeeAddress</th>
            <th className={styles.th}>EmployeePhone</th>
            <th className={styles.th}>Role </th>

            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((empData, index) => (
            <tr key={index}>
              <th className={styles.th}>{index + 1}</th>
              <td className={styles.th}>{empData.emp_name}</td>
              <td className={styles.th}>{empData.emp_email}</td>
              <td className={styles.th}>{empData.emp_address}</td>
              <td className={styles.th}>{empData.emp_phone}</td>
              <td className={styles.th}>{empData.role_id}</td>
              <td className={styles.btn__cols}>
                <button
                  className={styles.delete}
                  onClick={() => deleteEmployee(empData.emp_id)}
                >
                  Delete
                </button>
                <button className={styles.update}>
                 <Link href={`/employee/${empData.emp_id}`}>Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <center><Employeeaction/></center>
     
    </div>
    </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/employee");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Home;