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
      'Members',
      [
        {
          code: 'M001',
          name: 'Angga',
          penalty: false,
          penaltyUpTo: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'M002',
          name: 'Ferry',
          penalty: false,
          penaltyUpTo: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'M003',
          name: 'Putri',
          penalty: false,
          penaltyUpTo: null,
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

