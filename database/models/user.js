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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "El Nombre es obligatorio"
        },
        is: {
          args: /^[a-zA-ZáéíóúñÁÉÍÓÚ\s]+$/,
          msg: "El Nombre no debe contener Números"
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "El Apellido Paterno es obligatorio"
        },
        is: {
          args: /^[a-zA-ZáéíóúñÁÉÍÓÚ\s]+$/,
          msg: "El Apellido Paterno no debe contener Números"
        }
      }
    },
    secondLastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "El Apellido Materno es obligatorio"
        },
        is: {
          args: /^[a-zA-ZáéíóúñÁÉÍÓÚ\s]+$/,
          msg: "El Apellido Materno no debe contener Números"
        }
      }
    },
    phone: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
      notNull: {
        msg: "El número de teléfono es obligatorio"
      },
      isNumeric: {
        msg: "Solo se admiten números"
      }
    } 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'El email es obligatorio',
        },
        isEmail: {
          msg: 'Debe ingresar un email válido'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'La dirección es obligatoria',
        }
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'El estatus es obligatorio',
        }
      }
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El curso es obligatorio'
        }
      }
    },
    observations: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};