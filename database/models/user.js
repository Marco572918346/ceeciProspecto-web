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

      models.User.belongsTo(models.Roll,
        {
          as: 'userRoll',
          foreignKey: 'status'
        }
      );

      models.User.hasMany(models.RollList,
        {
          as: 'studentRoll',
          foreignKey: 'studentId'
        }
      );

      // models.User.hasMany(models.Rolls,
      //   {
      //     as: 'rollc',
      //     foreignKey: 'roll'
      //   }
      // );

    }
  }
  User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    secondLastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.INTEGER,
    area: DataTypes.INTEGER,
    observations: DataTypes.STRING,
    roll: DataTypes.STRING,
    key: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};