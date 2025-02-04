module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn("specialties", "name", "nameVi");
  },

  down: function (queryInterface, Sequelize) {
    //
  },
};
