import db from "../models/index.js";

export const createApplicant = async (data, file) => {
  return db.sequelize.transaction(async (t) => {

    if (file) {
      data.applicant.photo = file.path; 
    }


    const applicant = await db.Applicant.create(data.applicant, { transaction: t });

    // Educational Qualifications
    if (data.education?.length) {
      for (const edu of data.education) {
        await db.EducationalQualification.create(
          { ...edu, applicantId: applicant.id },
          { transaction: t }
        );
      }
    }

    // Family Background
    if (data.family) {
      await db.FamilyBackground.create(
        { ...data.family, applicantId: applicant.id },
        { transaction: t }
      );
    }

    // Professional Experiences
    if (data.professional?.experiences?.length) {
      for (const exp of data.professional.experiences) {
        await db.ProfessionalDetails.create(
          { 
            company: exp.company,
            jobTitle: exp.jobTitle,
            startYear: exp.startYear,
            endYear: exp.endYear,
            natureOfWork: exp.natureOfWork,
            applicantId: applicant.id 
          },
          { transaction: t }
        );
      }
    }

    // Organization Contacts
    if (data.professional?.organizationContacts?.length) {
      for (const contact of data.professional.organizationContacts) {
        await db.OrganizationContact.create(
          { 
            name: contact.name,
            email: contact.email,
            position: contact.position,
            mobile: contact.mobile,
            applicantId: applicant.id
          },
          { transaction: t }
        );
      }
    }

    // Additional Questionnaire
    if (data.additionalQuestions) {
      const q = data.additionalQuestions;
      await db.AdditionalQuestionnaire.create(
        {
          ownHouse: q.ownHouse || null,
          accommodationType: q.accommodationType || null,
          areaLocationAddress: q.areaLocationAddress || null,
          knowDriving: q.knowDriving || null,
          haveLicense: q.haveLicense || null,
          ownConveyance: q.ownConveyance || null,
          computerLiterate: q.computerLiterate || null,
          computerSkillsDetails: q.computerSkillsDetails || null,
          jobProfile: q.jobProfile || null,
          reasonForChange: q.reasonForChange || null,
          strengthsWeaknesses: q.strengthsWeaknesses || null,
          whyJoinUs: q.whyJoinUs || null,
          whyHireYou: q.whyHireYou || null,
          noticePeriod: q.noticePeriod || null,
          currentCTC: q.currentCTC || null,
          expectedCTC: q.expectedCTC || null,
          applicantId: applicant.id,
        },
        { transaction: t }
      );
    }

    return applicant;
  });
};


export const getApplicants = async () => {
  return db.Applicant.findAll({
    include: [
      { model: db.EducationalQualification },
      { model: db.FamilyBackground },
      { model: db.ProfessionalDetails, include: [db.OrganizationContact] },
      { model: db.AdditionalQuestionnaire },
    ],
  });
};



export const getApplicantById = async (id) => {
  return db.Applicant.findOne({
    where: { id },
    include: [
      { model: db.EducationalQualification },
      { model: db.FamilyBackground },
      { model: db.ProfessionalDetails, include: [db.OrganizationContact] },
      { model: db.AdditionalQuestionnaire },
    ],
  });
};

export const getApplicantByName = async (name) => {
  return db.Applicant.findAll({
    where: {
      fullName: db.Sequelize.where(
        db.Sequelize.fn("LOWER", db.Sequelize.col("fullName")),
        "LIKE",
        `%${name.toLowerCase()}%`
      ),
    },
    include: [
      { model: db.EducationalQualification },
      { model: db.FamilyBackground },
      { model: db.ProfessionalDetails, include: [db.OrganizationContact] },
      { model: db.AdditionalQuestionnaire },
    ],
  });
};

export const deleteApplicant = async (id) => {
  const applicant = await db.Applicant.findByPk(id);
  if (!applicant) return null;

  await db.sequelize.transaction(async (t) => {
    await db.EducationalQualification.destroy({ where: { applicantId: id }, transaction: t });
    await db.FamilyBackground.destroy({ where: { applicantId: id }, transaction: t });
    const professionals = await db.ProfessionalDetails.findAll({ where: { applicantId: id }, transaction: t });
    for (const prof of professionals) {
      await db.OrganizationContact.destroy({ where: { professionalDetailsId: prof.id }, transaction: t });
    }
    await db.ProfessionalDetails.destroy({ where: { applicantId: id }, transaction: t });
    await db.AdditionalQuestionnaire.destroy({ where: { applicantId: id }, transaction: t });
    await applicant.destroy({ transaction: t });
  });

  return true;
};
