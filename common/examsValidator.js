import Joi from "joi";

const examsValidation = (data) => {
  const examsSchme = Joi.object({
    name: Joi.string().required(),
    exam_code: Joi.string().required(),
    exam_uuid: Joi.string().required(),
    noofquestions: Joi.int().required(),
    timing: Joi.int().required(),
    is_delete: Joi.bit().required(),
    is_active: Joi.bit().required(),
    exam_type_id: Joi.int().required(),
    iscurrect: Joi.bit().required(),
  });
  return examsSchme.validate(data);
};

export default examsValidation;
