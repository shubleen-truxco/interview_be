import sequelize from "../datasource.js";
import { DataTypes } from "sequelize";

import ApplicantModel from "./Applicant.js";
import EducationalQualificationModel from "./EducationalQualification.js";
import FamilyBackgroundModel from "./FamilyBackground.js";
import ProfessionalDetailsModel from "./ProfessionalDetails.js";
import AdditionalQuestionnaireModel from "./AdditionalQuestionnaire.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;

// Models
db.Applicant = ApplicantModel(sequelize, DataTypes);
db.EducationalQualification = EducationalQualificationModel(sequelize, DataTypes);
db.FamilyBackground = FamilyBackgroundModel(sequelize, DataTypes);
db.ProfessionalDetails = ProfessionalDetailsModel(sequelize, DataTypes);
db.AdditionalQuestionnaire = AdditionalQuestionnaireModel(sequelize, DataTypes);

// Associations
db.Applicant.hasMany(db.EducationalQualification, { foreignKey: "applicantId", onDelete: "CASCADE" });
db.EducationalQualification.belongsTo(db.Applicant, { foreignKey: "applicantId" });

db.Applicant.hasOne(db.FamilyBackground, { foreignKey: "applicantId", onDelete: "CASCADE" });
db.FamilyBackground.belongsTo(db.Applicant, { foreignKey: "applicantId" });

db.Applicant.hasMany(db.ProfessionalDetails, { foreignKey: "applicantId", onDelete: "CASCADE" });
db.ProfessionalDetails.belongsTo(db.Applicant, { foreignKey: "applicantId" });

db.Applicant.hasMany(db.AdditionalQuestionnaire, { foreignKey: "applicantId", onDelete: "CASCADE" });
db.AdditionalQuestionnaire.belongsTo(db.Applicant, { foreignKey: "applicantId" });

export default db;
