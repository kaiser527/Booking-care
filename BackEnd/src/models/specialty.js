"use strict";
import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Specialty.init(
    {
      nameVi: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT("long"),
      descriptionMarkdown: DataTypes.TEXT("long"),
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Specialty",
    }
  );
  return Specialty;
};
