import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getExamsById,
  deleteExamsById,
  updateExams,
} from "../../../controller/exams/examsAction";

const handler = nc({ onError });
handler.get(getExamsById);
handler.delete(deleteExamsById);
handler.put(updateExams);
export default handler;
