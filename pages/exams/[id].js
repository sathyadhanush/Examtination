import EditExams from "../editExams";

function updateExams({ exams }) {
  console.log("exams", exams);
  return <EditExams examsUpdateData={exams} />;
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/exams/${params.id}`);
  const exams = await res.json();
  return {
    props: { exams },

  };
}

export default updateExams;
