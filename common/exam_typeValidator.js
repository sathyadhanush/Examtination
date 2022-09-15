import Joi from "joi";

const examTypeValidation = (data) => {
  const examsSchme = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
 
  });
  return examsSchme.validate(data);
};

export default examTypeValidation;
