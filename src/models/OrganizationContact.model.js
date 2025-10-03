export default (sequelize, DataTypes) => {
  const OrganizationContact = sequelize.define(
    "OrganizationContact",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      position: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[0-9]{10,15}$/,
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );

  OrganizationContact.associate = (models) => {
    OrganizationContact.belongsTo(models.Applicant, {
      foreignKey: "applicantId",
      onDelete: "CASCADE",
    });
  };

  return OrganizationContact;
};
