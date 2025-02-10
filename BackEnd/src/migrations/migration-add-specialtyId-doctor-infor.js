module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      "Doctor_infors",
      "specialtyId",
      Sequelize.INTEGER
    );
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      "Doctor_infors",
      "specialtyId",
      Sequelize.INTEGER
    );
  },
};
