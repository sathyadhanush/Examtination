import { executeQuery } from "../../config/db";
import ErrorHandler from "../../common/errorHandler";
const getAllRole = async (req, res) => {
  try {
    console.log("all the user_role");
    let usersData = await executeQuery("select * from user_role", []);
    res.send(usersData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRoleById = async (req, res, next) => {
  let id = req.query.id;
  try {
    console.log("user_role by id");
    let usersData = await executeQuery(
      `select * from user_role where id=${id}`,
      []
    );
    if (usersData.length > 0) res.status(200).json(usersData);
    else {
      next(new ErrorHandler(`no user_role found with this id ${id}`, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};







export {
  getAllRole,
  getRoleById,

};