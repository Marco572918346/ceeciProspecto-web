'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RollList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.RollList.belongsTo(models.User,
        {
          as: 'rools',
          foreignKey: 'studentId'
        }
      );
    }
  }
  RollList.init({
    attendance: DataTypes.BOOLEAN,
    studentId: DataTypes.INTEGER,
    date: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'RollList',
  });
  return RollList;
};