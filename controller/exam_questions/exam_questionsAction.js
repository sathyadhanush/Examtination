import { executeQuery } from "../../config/db";
import examQuestionsValidation from "../../common/exam_questionsValidator";
import ErrorHandler from "../../common/errorHandler";
const getAllExamQuestions = async (req, res) => {
  try {
    console.log("all the exam_questions");
    let exam_questions = await executeQuery("select * from exam_questions", []);
    res.send(exam_questions);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getExamQuestionsById = async (req, res, next) => {
  let id = req.query.id;
  try {
    console.log("exam_questions by id");
    let exam_questions = await executeQuery(
      `select * from exam_questions where id=${id}`,
      []
    );
    if (exam_questions.length > 0) res.status(200).json(exam_questions);
    else {
      next(new ErrorHandler(`no exam_questions found with this id ${id}`, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteExamQuestionsById = async (req, res, next) => {
  let id = req.query.id;
  try {
    let exam_questions = await executeQuery(
      "delete from exam_questions where id=?",
      [id]
    );
    res.status(200).json("Exam_Questions Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveExamQuestions = async (req, res) => {
  try {
    const result = req.body;
    const { exam_id, question_id } = result;
    let { error } = examQuestionsValidation(result);
    if (error) {
      res.status(400).json(error.details[0].message);
    } else {
      console.log("post request");
      let examQuesData = await executeQuery(
        "insert into exam_questions(exam_id, question_id) values(?,?)",
        [exam_id, question_id]
      );
      examQuesData = await executeQuery(
        `select * from exam_questions where id=${examQuesData.insertId}`
      );
      res.status(201).json(examQuesData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateExamQuestions = async (req, res) => {
  let id = req.query.id;
  console.log("id", id);
  const { exam_id, question_id} = req.body;
  console.log("req.body", req.body);
  try {
    let examQuesData = await executeQuery(
      "select * from exam_questions where id=?",
      [id]
    );
    if (examQuesData.length > 0) {
      console.log("putrequest", examQuesData);
      examQuesData = await executeQuery(
        `update exam_questions set exam_id=?,question_id=? where id=${id}`,
        [exam_id, question_id]
      );
      res.status(200).json(examQuesData);
    } else {
      res.status(400).json(`exam_questions not found on this id=${id}`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllExamQuestions,
  getExamQuestionsById,
  deleteExamQuestionsById,
  saveExamQuestions,
  updateExamQuestions,
};