export default (sequelize, DataTypes) => {
  const Applicant = sequelize.define("Applicant", {
    fullName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true, unique: false },
    address: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    dateOfBirth: { type: DataTypes.DATEONLY, allowNull: true },
    positionApplied: { type: DataTypes.STRING, allowNull: true },
    nationality: { type: DataTypes.STRING, allowNull: true },
    height: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: true,
    },

    weight: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true,
    },

    bloodGroup: {
      type: DataTypes.ENUM(
        "A+","A-","B+","B-","O+","O-","AB+","AB-"
      ),
      allowNull: true
    },
    nativePlace: { type: DataTypes.STRING, allowNull: true },
    photo: {
        type: DataTypes.STRING, // file path or URL
        allowNull: true,
        validate: {
          isValidFormat(value) {
            if (value) {
              const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
              if (!allowedExtensions.some((ext) => value.endsWith(ext))) {
                throw new Error("Only JPG, PNG, and WEBP formats are allowed.");
              }
            }
          },
        },
      },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },{
    timestamps: true,  
    paranoid: false  
  });

  return Applicant;
};
