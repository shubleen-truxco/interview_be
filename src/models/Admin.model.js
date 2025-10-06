// src/models/admin.model.js
export default (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
          len: {
            args: [3, 50],
            msg: "Username must be between 3 and 50 characters",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6, 100],
            msg: "Password must be at least 6 characters",
          },
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true, 
      paranoid: false, 
      tableName: "admin",
    }
  );

  return Admin;
};
