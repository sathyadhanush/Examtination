import { executeQuery } from "../../config/db";
import ErrorHandler from "../../common/errorHandler";
const getAllType = async (req, res) => {
  try {
    console.log("all the exam_type");
    let examsData = await executeQuery("select * from exam_type", []);
    res.send(examsData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTypeById = async (req, res, next) => {
  let id = req.query.id;
  try {
    console.log("exam_type by id");
    let examsData = await executeQuery(
      `select * from exam_type where id=${id}`,
      []
    );
    if (examsData.length > 0) res.status(200).json(examsData);
    else {
      next(new ErrorHandler(`no exam_type found with this id ${id}`, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};







export {
  getAllType,
  getTypeById,

};