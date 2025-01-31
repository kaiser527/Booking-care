"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ForgotPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ForgotPassword.hasMany(models.User, {
        foreignKey: "email",
        as: "forgotPasswordData",
      });
    }
  }
  ForgotPassword.init(
    {
      email: DataTypes.STRING,
      status: DataTypes.STRING,
      token: DataTypes.STRING,
      oldPassword: DataTypes.STRING,
      currentPassword: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ForgotPassword",
    }
  );
  return ForgotPassword;
};
