import Joi from "joi";

const usersValidation = (data) => {
  const usersSchme = Joi.object({
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    uuid: Joi.string().required(),
    Age: Joi.string().required(),
    user_role_id: Joi.string().required(),
    email_id: Joi.string().required(),
    password: Joi.string().required(),
    phone_no: Joi.string().required(),
    created: Joi.string().required(),

  });
  console.log("validation returned")
  return usersSchme.validate(data);
};

export default usersValidation;
