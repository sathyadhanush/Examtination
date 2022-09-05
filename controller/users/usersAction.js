import { executeQuery } from "../../config/db";
import usersValidation from "../../common/usersValidator";
import ErrorHandler from "../../common/errorHandler";
const getAllUsers = async (req, res) => {
  try {
    console.log("all the users");
    let usersData = await executeQuery("select * from users", []);
    res.send(usersData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUsersById = async (req, res, next) => {
  let id = req.query.id;
  try {
    console.log("users by id");
    let usersData = await executeQuery(
      `select * from users where id=${id}`,
      []
    );
    if (usersData.length > 0) res.status(200).json(usersData);
    else {
      next(new ErrorHandler(`no users found with this id ${id}`, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUsersById = async (req, res, next) => {
  let id = req.query.id;
  try {
    let usersData = await executeQuery(
      "delete from users where id=?",
      [id]
    );
    res.status(200).json("Users Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveUsers = async (req, res) => {
  try {
    const result = req.body;
   
    const { lastName, firstName, uuid, Age, user_role_id, email_id, password, phone_no, created } = result;
    let { error } = usersValidation(result);
  
    if (error) {
      res.status(400).json(error.details[0].message);
    } else {
      console.log("post request");
      let usersData = await executeQuery(
        "insert into users(lastName,firstName,uuid,Age,user_role_id,email_id,password,phone_no,created) values(?,?,?,?,?,?,?,?,?)",
        [lastName, firstName, uuid, parseInt(Age), user_role_id, email_id, password, phone_no,created ]
      );
      usersData = await executeQuery(
        `select * from users where id=${usersData.insertId}`
      );
      res.status(201).json(usersData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUsers = async (req, res) => {
  let id = req.query.id;
  console.log("id", id);
  const { lastName, firstName, uuid, Age, user_role_id, email_id, password, phone_no } = req.body;
  console.log("req.body", req.body);
  try {
    let UsersData = await executeQuery(
      "select * from users where id=?",
      [id]
    );
    if (UsersData.length > 0) {
      console.log("putrequest", UsersData);


      UsersData = await executeQuery(
        `update users set lastName=?,firstName=?,uuid=?,Age=?,user_role_id=?,email_id=?,password=?,phone_no=? where id=${id}`,
        [lastName, firstName, uuid, parseInt(Age), user_role_id, email_id, password, phone_no]
      );
      res.status(200).json(UsersData);
    } else {
      res.status(400).json(`users not found on this id=${id}`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllUsers,
  getUsersById,
  deleteUsersById,
  saveUsers,
  updateUsers,
};