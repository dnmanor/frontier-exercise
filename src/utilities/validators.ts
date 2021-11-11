import Joi, { ValidationResult } from "joi";
import { JobApplication } from "./types";

const applicationSchema = {
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phone: Joi.string().required(),
  location: Joi.string().required(),
  linkedin: Joi.string()
    .pattern(new RegExp("^.*linkedin.com.*$"))
    .message("LinkedIn URL not valid")
    .required(),
  resume: Joi.string().required(),
  email: Joi.string().email().required(),
  worked_remote: Joi.string().optional(),
  worked_startup: Joi.string().optional(),
};

const verificationBluePrint = Joi.object<JobApplication>(applicationSchema);

export const validateJobApplication = (data: object): ValidationResult => {
  return verificationBluePrint.validate(data);
};
