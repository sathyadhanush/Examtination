import EditExam_Questions from "../editExam_Questions";

function updateExamQuestions({ exam_questions }) {
  console.log("exam_questions", exam_questions);
  return <EditExam_Questions examQuesUpdateData={exam_questions} />;
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/exam_questions/${params.id}`);
  const exam_questions = await res.json();

  return {
    props: { exam_questions },
  };
}

export default updateExamQuestions;
