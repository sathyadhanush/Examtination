import { executeQuery } from "../../config/db";
import ExamsValidation from "../../common/examsValidator";
import ErrorHandler from "../../common/errorHandler";
const getAllExams = async (req, res) => {
  try {
    console.log("all the exams");
    let examsData = await executeQuery("select * from exams", []);
    res.send(examsData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getExamsById = async (req, res, next) => {
  let id = req.query.id;
  try {
    console.log("exams by id");
    let examsData = await executeQuery(
      `select * from exams where id=${id}`,
      []
    );
    if (examsData.length > 0) res.status(200).json(examsData);
    else {
      next(new ErrorHandler(`no exams found with this id ${id}`, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteExamsById = async (req, res, next) => {
  let id = req.query.id;
  try {
    let examsData = await executeQuery(
      "delete from exams where id=?",
      [id]
    );
    res.status(200).json("Exams Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveExams = async (req, res) => {
  try {
    const result = req.body;
   
    const { name, exam_code, exam_uuid, noofquestions, timing, is_delete, is_active, exam_type_id, iscurrect  } = result;
    let { error } = ExamsValidation(result);
     
    if (error) {
      res.status(400).json(error.details[0].message);
    } else {
      console.log("post request");

      let examsData = await executeQuery(

        "insert into exams(name, exam_code, exam_uuid, noofquestions, timing, is_delete, is_active, exam_type_id, iscurrect ) values(?,?,?,?,?,?,?,?,?)",
        [name, exam_code, exam_uuid, noofquestions, parseInt(timing), is_delete, is_active, exam_type_id, iscurrect ]
      );
      examsData = await executeQuery(
        `select * from exams where id=${examsData.insertId}`
      );
      res.status(201).json(examsData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateExams = async (req, res) => {
  let id = req.query.id;
  console.log("id", id);
  const { name, exam_code, exam_uuid, noofquestions, timing, is_delete, is_active, exam_type_id, iscurrect  } = req.body;
  console.log("req.body", req.body);
  try {
    let examsData = await executeQuery(
      "select * from exams where id=?",
      [id]
    );
    if (examsData.length > 0) {
      console.log("putrequest", examsData);


      examsData = await executeQuery(
        `update exams set name=?,exam_code=?,exam_uuid=?,noofquestions=?,timing=?,is_delete=?,is_active=?,exam_type_id=?,iscurrect=? where id=${id}`,
        [name, exam_code, exam_uuid, noofquestions, parseInt(timing), is_delete, is_active, exam_type_id, iscurrect]
      );
      res.status(200).json(examsData);
    } else {
      res.status(400).json(`exams not found on this id=${id}`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllExams,
  getExamsById,
  deleteExamsById,
  saveExams,
  updateExams,
};