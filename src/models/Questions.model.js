export default (sequelize, DataTypes) => {
  const AdditionalQuestionnaire = sequelize.define(
    "AdditionalQuestionnaire",
    {
      ownHouse: {
        type: DataTypes.ENUM("yes", "no"),
        allowNull: true,
      },
      accommodationType: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      areaLocationAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      knowDriving: {
        type: DataTypes.ENUM("yes", "no"),
        allowNull: true,
      },
      haveLicense: {
        type: DataTypes.ENUM("yes", "no"),
        allowNull: true,
      },
      ownConveyance: {
        type: DataTypes.ENUM("yes", "no"),
        allowNull: true,
      },
      computerLiterate: {
        type: DataTypes.ENUM("yes", "no"),
        allowNull: true,
      },
      computerSkillsDetails: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      jobProfile: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reasonForChange: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      strengthsWeaknesses: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      whyJoinUs: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      whyHireYou: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      noticePeriod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currentCTC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expectedCTC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true, 
      paranoid: false,
    }
  );

  AdditionalQuestionnaire.associate = (models) => {
    AdditionalQuestionnaire.belongsTo(models.Applicant, {
      foreignKey: "applicantId",
      onDelete: "CASCADE",
    });

  };

  return AdditionalQuestionnaire;
};
