import Joi from "joi";

const examQuestionsValidation = (data) => {
  const examQuestionsSchme = Joi.object({
    exam_id: Joi.string().required(),
    question_id: Joi.string().required(),
  });
  return examQuestionsSchme.validate(data);
};

export default examQuestionsValidation;
