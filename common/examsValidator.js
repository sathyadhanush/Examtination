import Joi from "joi";

const examsValidation = (data) => {
  const examsSchme = Joi.object({
    name: Joi.string().required(),
    exam_code: Joi.string().required(),
    exam_uuid: Joi.string().required(),
    noofquestions: Joi.string().required(),
    timing: Joi.string().required(),
    is_delete: Joi.string().required(),
    is_active: Joi.string().required(),
    exam_type_id: Joi.string().required(),
    iscurrect: Joi.string().required(),

  });
  console.log("validation returned")
  return examsSchme.validate(data);
};

export default examsValidation;
