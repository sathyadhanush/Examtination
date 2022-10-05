import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getExamQuestionsById,
  deleteExamQuestionsById,
  updateExamQuestions,
} from "../../../controller/exam_questions/exam_questionsAction";

const handler = nc({ onError });
handler.get(getExamQuestionsById);
handler.delete(deleteExamQuestionsById);
handler.put(updateExamQuestions);
export default handler;
