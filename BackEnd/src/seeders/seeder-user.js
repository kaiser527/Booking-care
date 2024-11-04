"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        email: "kiana@gmail.com",
        password: "meisenpaiislove",
        fullName: "Kiana Kaslana",
        address: "st.freya",
        phoneNumber: "0829298223",
        gender: 0,
        image: "",
        roleId: "R1",
        positionId: "R2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
