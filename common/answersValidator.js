import Joi from "joi";

const answersValidation = (data) => {
  const answersSchme = Joi.object({
    name1: Joi.string().required(),
    name2: Joi.string().required(),
    name3: Joi.string().required(),
    name4: Joi.string().required(),
    question_id: Joi.string().required(),
    iscurrect: Joi.string().required(),
    
  });
  console.log("validation returned")
  return answersSchme.validate(data);
};

export default answersValidation;
