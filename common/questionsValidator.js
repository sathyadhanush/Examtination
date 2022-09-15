import Joi from "joi";

const questionsValidation = (data) => {
  const questionsSchme = Joi.object({
    name: Joi.string().required(),
    question_type_id: Joi.string().required(),
    answers: Joi.string().required(),
  });
  console.log("validation returned")
  return questionsSchme.validate(data);
};

export default questionsValidation;
