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
    const { name, questions_type_id, answers } = result;
    let { error } = questionsValidation(result);
    if (error) {
             console.log("post request2");
      res.status(400).json(error.details[0].message);
    } else {
      console.log("post request3");
      console.log("post request");
      let questionsData = await executeQuery(
        "insert into questions(name, questions_type_id, answers) values(?,?,?)",
        [name, questions_type_id, answers]
      );
      questionsData = await executeQuery(
        `select * from questions where id=${questionsData.insertId}`
      );
      res.status(201).json(questionsData);
    }
  } catch (err) {
    console.log("post request4");
    res.status(400).json(err);
  }
};

const updateQuestions = async (req, res) => {
  let id = req.query.id;
  console.log("id", id);
  const { name, questions_type_id, answers} = req.body;
  console.log("req.body", req.body);
  try {
    let questionsData = await executeQuery(
      "select * from questions where id=?",
      [id]
    );
    if (questionsData.length > 0) {
      console.log("putrequest", questionsData);
      questionsData = await executeQuery(
        `update questions set name=?,question_type_id=?,answers=? where id=${id}`,
        [name,  parseInt(questions_type_id), answers]
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