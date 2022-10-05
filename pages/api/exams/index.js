import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getAllExams,
  saveExams,
} from "../../../controller/exams/examsAction";
const handler = nc(onError);
handler.get(getAllExams);
handler.post(saveExams);
export default handler;
