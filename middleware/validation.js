import { createApplicantSchema } from "../validations/applicants.valid.js";

export const validateCreateApplicant = (req, res, next) => {
  let data;
  if (req.body.data) {
    data = JSON.parse(req.body.data);
  } else {
    data = req.body;
  }
  const { error } = createApplicantSchema.validate(data, { abortEarly: false });
  if (error) {
    const message = error.details.map(d => d.message).join(", ");
    return res.status(400).json({ success: false, message });
  }
  next();
};
