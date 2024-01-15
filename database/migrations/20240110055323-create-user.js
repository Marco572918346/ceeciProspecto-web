'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull:false,
      },
      lastname: {
        type: Sequelize.STRING(15),
        allowNull:false,
      },
      secondLastname: {
        type: Sequelize.STRING(15),
        allowNull:false,
      },
      phone: {
        type: Sequelize.STRING(10),
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING(255),
        unique:true,
        allowNull:false,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull:false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Statuses',
          key: 'id'
        }
      },
      area: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Courses',
          key: 'id'
        }
      },
      observations: {
        type: Sequelize.STRING(200),
        allowNull:true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};