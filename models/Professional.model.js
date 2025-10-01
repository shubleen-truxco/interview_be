export default (sequelize, DataTypes) => {
  const ProfessionalExperience = sequelize.define(
    "ProfessionalExperience",
    {
      company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      startYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // validate: {
        //   isInt: true,
        //   min: 1900,
        //   max: new Date().getFullYear(),
        // },
      },
      endYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      natureOfWork: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true, // createdAt, updatedAt
    }
  );

  ProfessionalExperience.associate = (models) => {
    ProfessionalExperience.belongsTo(models.Applicant, {
      foreignKey: "applicantId",
      onDelete: "CASCADE",
    });
  };

  return ProfessionalExperience;
};
