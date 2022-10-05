import { executeQuery } from "../../config/db";
import questionsValidation from "../../common/questionsValidator";
import answersValidation from "../../common/answersValidator";
import ErrorHandler from "../../common/errorHandler";
import React, { useState} from "react";
const getAllQuestions = async (req, res) => {
  try {
    console.log("all the questions");
    let questionsData = await executeQuery("select * from questions", []);
    res.send(questionsData);
    console.log("all the answers");
    let answersData = await executeQuery("select * from answers", []);
    res.send(answersData);
    console.log("all the user_answers");
    let userAnsData = await executeQuery("select * from user_answers", []);
    res.send(userAnsData);
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
    console.log("answers by id");
    let answersData = await executeQuery(
      `select * from answers where id=${id}`,
      []
    );
    console.log("user_answers by id");
    let userAnsData = await executeQuery(
      `select * from user_answers where id=${id}`,
      []
    );
    if (questionsData.length > 0,answersData.length > 0,userAnsData.length > 0) res.status(200).json(questionsData,answersData,userAnsData);
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
    console.log("********************************post request1");
    const result = req.body;
    const result1 = req.body;
    console.log(result);
      console.log(result1);


    const { name, question_type_id, is_delete, is_active, created } = result;
    const { answers1,answers2,answers3,answers4,currectans } = result1;
   
    let { error } = questionsValidation(result);
    let { error1 } = answersValidation(result1);

    if (error,error1) {
             console.log("post request2");
      res.status(400).json(error.details[0].message);

    } else {
      console.log("post request3");
      console.log("post request");
      let questionsData = await executeQuery(
        "insert into questions(name, question_type_id, is_delete, is_active, created) values(?,?,?,?,?)",
        [name, question_type_id, 1, 1, created]
      );
      console.log("currectans");


  
      if (currectans=="1")
      {
        let answersData1 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers1, questionsData.insertId, "1"]
        );
        let answersData2 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers2, questionsData.insertId, "0"]
        );
        let answersData3 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers3, questionsData.insertId, "0"]
        );
        let answersData4 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers4, questionsData.insertId, "0"]
        ); 
      }
      else if  (currectans=="2")
      {
        let answersData1 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers1, questionsData.insertId, "0"]
        );
        let answersData2 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers2, questionsData.insertId, "1"]
        );
        let answersData3 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers3, questionsData.insertId, "0"]
        );
        let answersData4 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers4, questionsData.insertId, "0"]
        ); 
      }
      else if (currectans=="3")
      {
        let answersData1 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers1, questionsData.insertId, "0"]
        );
        let answersData2 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers2, questionsData.insertId, "0"]
        );
        let answersData3 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers3, questionsData.insertId, "1"]
        );
        let answersData4 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers4, questionsData.insertId, "0"]
        );
      }

      else if (currectans=="4")
      {
        let answersData1 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers1, questionsData.insertId, "0"]
        );
        let answersData2 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers2, questionsData.insertId, "0"]
        );
        let answersData3 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers3, questionsData.insertId, "0"]
        );
        let answersData4 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers4, questionsData.insertId, "1"]
        );
      }


      console.log("**************currectans");
     

      // questionsData = await executeQuery(
      //   `select * from questions where id=${questionsData.insertId}`
      // );
console.log("question_id",questionsData.insertId)
      // res.status(201).json(questionsData);
  
      res.status(201).json(questionsData);
    }
  } catch (err) {
    console.log("post request4",err);
    res.status(400).json(err);
  }
};

const updateQuestions = async (req, res) => {
  let id = req.query.id;
  console.log("id", id);
  const { name, question_type_id, is_delete, is_active, created} = req.body;
  const { answers, question_id, iscurrect } = req.body;
  console.log("req.body", req.body);
  try {
    let questionsData = await executeQuery(
      "select * from questions where id=?",
      [id]
    );
    let answersData = await executeQuery(
      "select * from answers where id=?",
      [id]
    );
    let userAnsData = await executeQuery(
      "select * from user_answers where id=?",
      [id]
    );
    
    if (questionsData.length > 0,answersData.length>0,userAnsData.length>0) {
      console.log("putrequest", questionsData);
      questionsData = await executeQuery(
        `update questions set name=?,question_type_id=?,is_delete=?,is_active=?,created=? where id=${id}`,
        [name, question_type_id, is_delete, is_active, created]
      );
      answersData = await executeQuery(
        `update answers set answers=?,question_id=?,iscurrect=? where id=${id}`,
        [ answers,question_id, iscurrect]
      );
      userAnsData = await executeQuery(
        `update user_answers set user_id=?,exam_id=?,question_id=?,answer=?,created=? where id=${id}`,
        [user_id, exam_id, parseInt(question_id), answer, created ]
      );
      
      res.status(200).json(questionsData,answersData,userAnsData);
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