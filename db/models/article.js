'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    body: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    claps: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Article.associate = function(models) {
    Article.belongsto(models.User, { foreignKey: 'userId'});
  };
  return Article;
};