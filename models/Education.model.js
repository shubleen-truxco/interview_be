export default (sequelize, DataTypes) => {
  const EducationalQualification = sequelize.define(
    "EducationalQualification",
    {
      qualification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      boardUniversity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      yearOfPassing: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // validate: {
        //   isInt: true,
        //   min: 1900,
        //   max: new Date().getFullYear(),
        // },
      },
      percentage: {
        type: DataTypes.DECIMAL(5, 2), 
        allowNull: true,
        // validate: {
        //   min: 0,
        //   max: 100,
        // },
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

  // Association
  EducationalQualification.associate = (models) => {
    EducationalQualification.belongsTo(models.Applicant, {
      foreignKey: "applicantId",
      onDelete: "CASCADE", 
    });
  };

  return EducationalQualification;
};
