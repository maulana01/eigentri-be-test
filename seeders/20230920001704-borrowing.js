/** @format */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Borrowings',
      [
        {
          bookCode: 'JK-45',
          memberCode: 'M001',
          borrowDate: new Date(),
          returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
          isReturned: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bookCode: 'SHR-1',
          memberCode: 'M001',
          borrowDate: new Date(),
          returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
          isReturned: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bookCode: 'NRN-7',
          memberCode: 'M002',
          borrowDate: new Date(),
          returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
          isReturned: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

