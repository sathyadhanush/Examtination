import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getUsersById,
  deleteUsersById,
  updateUsers,
} from "../../../controller/users/usersAction";

const handler = nc({ onError });
handler.get(getUsersById);
handler.delete(deleteUsersById);
handler.put(updateUsers);
export default handler;
