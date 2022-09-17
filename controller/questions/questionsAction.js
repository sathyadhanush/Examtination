import { executeQuery } from "../../config/db";
import questionsValidation from "../../common/questionsValidator";
import ErrorHandler from "../../common/errorHandler";
const getAllQuestions = async (req, res) => {
  try {
    console.log("all the questions");
    let questionsData = await executeQuery("select * from questions", []);
    res.send(questionsData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getQuestionsById = async (req, res, next) => {
  let id = req.query.id;
  try {
    console.log("questions by id");
    let questionsData = await executeQuery(
      `select * from questions where id=${id}`,
      []
    );
    if (questionsData.length > 0) res.status(200).json(questionsData);
    else {
      next(new ErrorHandler(`no questions found with this id ${id}`, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteQuestionsById = async (req, res, next) => {
  let id = req.query.id;
  try {
    let questionsData = await executeQuery(
      "delete from questions where id=?",
      [id]
    );
    res.status(200).json("Questions Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveQuestions = async (req, res) => {
  try {
    console.log("post request1");
    const result = req.body;
    const { name, question_type_id, is_delete, is_active, created } = result;
    let { error } = questionsValidation(result);
    if (error) {
             console.log("post request2");
      res.status(400).json(error.details[0].message);
    } else {
      console.log("post request3");
      console.log("post request");
      let questionsData = await executeQuery(
        "insert into questions(name, question_type_id, is_delete, is_active, created) values(?,?,?,?,?)",
        [name, question_type_id, is_delete, is_active, created]
      );
      // questionsData = await executeQuery(
      //   `select * from questions where id=${questionsData.insertId}`
      // );
console.log("question_id",questionsData.insertId)
      // res.status(201).json(questionsData);
      let answersData1 = await executeQuery(
        "insert into answers(name1, name2, name3, name4, question_id, iscurrect) values(?,?,?,?,?,?)",
        ["1", "2", "3", "4", questionsData.insertId, "1"]
      );
      let answersData2 = await executeQuery(
        "insert into answers(name1, name2, name3, name4, question_id, iscurrect) values(?,?,?,?,?,?)",
        ["1", "2", "3", "4", questionsData.insertId, "1"]
      );
      let answersData3 = await executeQuery(
        "insert into answers(name1, name2, name3, name4, question_id, iscurrect) values(?,?,?,?,?,?)",
        ["1", "2", "3", "4", questionsData.insertId, "1"]
      );
      let answersData4 = await executeQuery(
        "insert into answers(name1, name2, name3, name4, question_id, iscurrect) values(?,?,?,?,?,?)",
        ["1", "2", "3", "4", questionsData.insertId, "1"]
      );
      
      answersData = await executeQuery(
        `select * from answers where id=${answersData.insertId}`
      );
      res.status(201).json(answersData);
    }
  } catch (err) {
    console.log("post request4");
    res.status(400).json(err);
  }
};

const updateQuestions = async (req, res) => {
  let id = req.query.id;
  console.log("id", id);
  const { name, question_type_id, is_delete, is_active, created} = req.body;
  console.log("req.body", req.body);
  try {
    let questionsData = await executeQuery(
      "select * from questions where id=?",
      [id]
    );
    if (questionsData.length > 0) {
      console.log("putrequest", questionsData);
      questionsData = await executeQuery(
        `update questions set name=?,question_type_id=?,is_delete=?,is_active=?,created=? where id=${id}`,
        [name, question_type_id, is_delete, is_active, created]
      );
      res.status(200).json(questionsData);
    } else {
      res.status(400).json(`questions not found on this id=${id}`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllQuestions,
  getQuestionsById,
  deleteQuestionsById,
  saveQuestions,
  updateQuestions,
};