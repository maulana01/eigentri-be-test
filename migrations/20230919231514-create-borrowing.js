/** @format */

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Borrowings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookCode: {
        type: Sequelize.STRING,
        references: {
          model: 'Books',
          key: 'code',
        },
      },
      memberCode: {
        type: Sequelize.STRING,
        references: {
          model: 'Members',
          key: 'code',
        },
      },
      borrowDate: {
        type: Sequelize.DATEONLY,
      },
      returnDate: {
        type: Sequelize.DATEONLY,
      },
      isReturned: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Borrowings');
  },
};

