import nc from "next-connect";
import onError from "../../../../common/errormiddleware";
import {
  getRoleById,
  
} from "../../../controller/users/userRole";

const handler = nc({ onError });
handler.get( getRoleById);

export default handler;
