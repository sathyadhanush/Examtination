import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getAllExamQuestions,
  saveExamQuestions,
} from "../../../controller/exam_questions/exam_questionsAction";
const handler = nc(onError);
handler.get(getAllExamQuestions);
handler.post(saveExamQuestions);
export default handler;
