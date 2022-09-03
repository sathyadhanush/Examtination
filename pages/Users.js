import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/EmployeeList.module.css";
import axios from "axios"
import Layout from '../components/Layout'
import Usersaction from "./usersAction";
import UsersEditAction from "./usersEditAction";
function Home({ data }) {
  console.log("data", data);
  const router = useRouter();
  const deleteUsers = async (id) => {
   
    let text = "Delete Users List ";
    if (confirm(text) == true) {
      let data = await axios.delete(`http://localhost:3000/api/users/${id}`);
      router.push("/Users");
    } else {
      console.log( "You canceled!")
    }
   
  };
  return (
    <div>
       <Layout>
       <label className={styles.label}>USERS</label>
    <div className={styles.cols}>
    
      <table className={styles.table}>
        <thead className={styles.thead}>  
          <tr>
            <th className={styles.th}>Id</th>
            <th className={styles.th}>LastName</th>
            <th className={styles.th}>FirstName</th>
            <th className={styles.th}>Uuid</th>
            <th className={styles.th}>Age </th>
            <th className={styles.th}>User_Role_Id</th>
            <th className={styles.th}>Email_Id </th>
            <th className={styles.th}>Password </th>
            <th className={styles.th}>Phone_no </th>
            <th className={styles.th}>Created </th>

            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((usersData, index) => (
            <tr key={index}>
              <th className={styles.th}>{index + 1}</th>
              <td className={styles.th}>{usersData.last_Name}</td>
              <td className={styles.th}>{usersData.firstName}</td>
              <td className={styles.th}>{usersData.uuid}</td>
              <td className={styles.th}>{usersData.Age}</td>
              <td className={styles.th}>{usersData.user_role_id}</td>
              <td className={styles.btn__cols}>
                <button
                  className={styles.delete}
                  onClick={() => deleteUsers(usersData.id)}
                 
                >
                  Delete
                
                </button>
                <button className={styles.update}>
                 <Link href={`/users/${usersData.id}`}>Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <center><Usersaction/></center>
     
    </div>
    </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Home;