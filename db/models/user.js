"use strict";
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      bio: DataTypes.TEXT,
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Article, { foreignKey: "userId" }),
    User.hasMany(models.Comment, { foreignKey: "userId"})
  };
  User.prototype.validate = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
    // console.log(validation);
  }
  return User;
};
