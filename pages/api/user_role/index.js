import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getAllRole,

} from "../../../controller/users/userRole";
const handler = nc(onError);
handler.get(  getAllRole);

export default handler;
