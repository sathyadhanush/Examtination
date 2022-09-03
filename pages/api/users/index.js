import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getAllUsers,
  saveUsers,
} from "../../../controller/users/usersAction";
const handler = nc(onError);
handler.get(getAllUsers);
handler.post(saveUsers);
export default handler;
