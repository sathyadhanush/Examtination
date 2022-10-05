import EditUsers from "../editUsers";

function updateUsers({ users }) {
  console.log("users", users);
  return <EditUsers usersUpdateData={users} />;
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/users/${params.id}`);
  const users = await res.json();

  return {
    props: { users },
  };
}

export default updateUsers;
