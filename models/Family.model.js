export default (sequelize, DataTypes) => {
  const FamilyBackground = sequelize.define(
    "FamilyBackground",
    {
      maritalStatus: {
        type: DataTypes.ENUM("Single", "Married", "Divorced", "Widowed", "Separated"),
        allowNull: true,
      },

      spouseName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      spouseDob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      spouseOccupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      fatherName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fatherOccupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fatherCompany: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fatherDob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      motherName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      motherOccupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      motherCompany: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      motherDob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
       children: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: "Array of child objects [{ name, dob, relation: 'Son'|'Daughter' }]",
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

  FamilyBackground.associate = (models) => {
  
    FamilyBackground.belongsTo(models.Applicant, {
      foreignKey: "applicantId",
      onDelete: "CASCADE",
    });

  };

  return FamilyBackground;
};
