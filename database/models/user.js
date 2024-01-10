'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsTo(models.Status,
        {
          as: 'userStatus',
          foreignKey: 'status'
        }
      );

      models.User.belongsTo(models.Course,
        {
          as: 'course',
          foreignKey: 'area'
        }
      );
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.INTEGER,
    area: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};