import sequelize from "../datasource.js";
import { DataTypes } from "sequelize";
import ApplicantModel from "./Applicant.model.js";
import EducationalQualificationModel from "./Education.model.js";
import FamilyBackgroundModel from "./Family.model.js";
import ProfessionalDetailsModel from "./Professional.model.js";
import AdditionalQuestionnaireModel from "./Questions.model.js";
import OrganizationContactModel from "./OrganizationContact.model.js";
import AdminModel from "./Admin.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;

// Models
db.Admin =AdminModel(sequelize,DataTypes);
db.Applicant = ApplicantModel(sequelize, DataTypes);
db.EducationalQualification = EducationalQualificationModel(sequelize, DataTypes);
db.FamilyBackground = FamilyBackgroundModel(sequelize, DataTypes);
db.ProfessionalDetails = ProfessionalDetailsModel(sequelize, DataTypes);
db.AdditionalQuestionnaire = AdditionalQuestionnaireModel(sequelize, DataTypes);
db.OrganizationContact = OrganizationContactModel(sequelize, DataTypes);

// Associations
db.Applicant.hasMany(db.EducationalQualification, { foreignKey: "applicantId", onDelete: "CASCADE" });
db.EducationalQualification.belongsTo(db.Applicant, { foreignKey: "applicantId" });

db.Applicant.hasOne(db.FamilyBackground, { foreignKey: "applicantId", onDelete: "CASCADE" });
db.FamilyBackground.belongsTo(db.Applicant, { foreignKey: "applicantId" });

db.Applicant.hasMany(db.ProfessionalDetails, { foreignKey: "applicantId", onDelete: "CASCADE" });
db.ProfessionalDetails.belongsTo(db.Applicant, { foreignKey: "applicantId" });

db.Applicant.hasMany(db.AdditionalQuestionnaire, { foreignKey: "applicantId", onDelete: "CASCADE" });
db.AdditionalQuestionnaire.belongsTo(db.Applicant, { foreignKey: "applicantId" });

// New association
db.ProfessionalDetails.hasMany(db.OrganizationContact, { foreignKey: "professionalDetailsId", onDelete: "CASCADE" });
db.OrganizationContact.belongsTo(db.ProfessionalDetails, { foreignKey: "professionalDetailsId" });

export default db;
