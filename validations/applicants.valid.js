import Joi from "joi";

const childSchema = Joi.object({
  name: Joi.string().required(),
  dob: Joi.date().iso().required(),
  relation: Joi.string().valid("Son", "Daughter").required(),
});

const familySchema = Joi.object({
  maritalStatus: Joi.string().valid("Single", "Married", "Divorced", "Widowed", "Separated").optional(),
  spouseName: Joi.string().optional(),
  spouseDob: Joi.date().iso().optional(),
  spouseOccupation: Joi.string().optional(),

  fatherName: Joi.string().optional(),
  fatherOccupation: Joi.string().optional(),
  fatherCompany: Joi.string().optional(),
  fatherDob: Joi.date().iso().optional(),

  motherName: Joi.string().optional(),
  motherOccupation: Joi.string().optional(),
  motherCompany: Joi.string().optional(),
  motherDob: Joi.date().iso().optional(),

  children: Joi.array().items(childSchema).optional()
});

const educationSchema = Joi.object({
  qualification: Joi.string().required(),
  boardUniversity: Joi.string().required(),
  yearOfPassing: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  percentage: Joi.number().min(0).max(100).required(),
});

const experienceSchema = Joi.object({
  company: Joi.string().required(),
  jobTitle: Joi.string().required(),
  startYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  endYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  natureOfWork: Joi.string().required(),
});

const orgContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  position: Joi.string().required(),
  mobile: Joi.string().required(),
});

const additionalQuestionsSchema = Joi.object({
  ownHouse: Joi.boolean().optional(),
  accommodationType: Joi.string().optional(),
  areaLocationAddress: Joi.string().optional(),
  knowDriving: Joi.boolean().optional(),
  haveLicense: Joi.boolean().optional(),
  ownConveyance: Joi.boolean().optional(),
  computerLiterate: Joi.boolean().optional(),
  computerSkillsDetails: Joi.string().optional(),
  jobProfile: Joi.string().optional(),
  reasonForChange: Joi.string().optional(),
  strengthsWeaknesses: Joi.string().optional(),
  whyJoinUs: Joi.string().optional(),
  whyHireYou: Joi.string().optional(),
  noticePeriod: Joi.string().optional(),
  currentCTC: Joi.number().optional(),
  expectedCTC: Joi.number().optional(),
});

export const createApplicantSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  dateOfBirth: Joi.date().iso().required(),
  positionApplied: Joi.string().optional(),
  nationality: Joi.string().optional(),
  height: Joi.number().optional(),
  weight: Joi.number().optional(),
  bloodGroup: Joi.string().valid("A+","A-","B+","B-","O+","O-","AB+","AB-").optional(),
  nativePlace: Joi.string().optional(),
  photo: Joi.string().pattern(/\.(jpg|jpeg|png|webp)$/i).optional(),
  education: Joi.array().items(educationSchema).optional(),
  family: familySchema.optional(),
  professional: Joi.object({
    experiences: Joi.array().items(experienceSchema).optional(),
    organizationContacts: Joi.array().items(orgContactSchema).optional()
  }).optional(),
  additionalQuestions: additionalQuestionsSchema.optional(),
});
