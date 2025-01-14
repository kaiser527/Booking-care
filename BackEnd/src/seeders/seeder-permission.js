"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Permissions", [
      {
        roleId: "R1",
        url: "/api/get-all-users",
        description: "get all users",
        createdAt: "2025/3/2",
        updatedAt: "2025/3/2",
      },
      {
        roleId: "R1",
        url: "/api/create-new-user",
        description: "create new user",
        createdAt: "2025/3/2",
        updatedAt: "2025/3/2",
      },
      {
        roleId: "R1",
        url: "/api/edit-user",
        description: "edit user",
        createdAt: "2025/3/2",
        updatedAt: "2025/3/2",
      },
      {
        roleId: "R1",
        url: "/api/delete-user",
        description: "delete user",
        createdAt: "2025/3/2",
        updatedAt: "2025/3/2",
      },
      {
        roleId: "R1",
        url: "/api/get-all-doctors",
        description: "get all doctors",
        createdAt: "2025/3/2",
        updatedAt: "2025/3/2",
      },
      {
        roleId: "R1",
        url: "/api/save-info-doctor",
        description: "save info doctor",
        createdAt: "2025/3/2",
        updatedAt: "2025/3/2",
      },
      {
        roleId: "R1",
        url: "/api/get-doctor-markdown-by-id",
        description: "get doctor markdown by id",
        createdAt: "2025/3/2",
        updatedAt: "2025/3/2",
      },
      {
        roleId: "R1",
        url: "/api/allcode",
        description: "get allcode",
        createdAt: "2025/3/2",
        updatedAt: "2025/3/2",
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
