"use strict";
import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clinic.hasMany(models.Doctor_infor, {
        foreignKey: "clinicId",
        as: "doctorClinic",
      });
    }
  }
  Clinic.init(
    {
      nameVi: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      address: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT("long"),
      descriptionMarkdown: DataTypes.TEXT("long"),
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Clinic",
    }
  );
  return Clinic;
};
