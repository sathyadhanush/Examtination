import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getAllType,

} from "../../../controller/exams/examType";
const handler = nc(onError);
handler.get(  getAllType);

export default handler;
