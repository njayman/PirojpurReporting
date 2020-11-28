module.exports = (sequelize, Sequelize) => {
    const agriFair = sequelize.define("agriFair", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      district: {
        type: Sequelize.STRING
      },
      upazilla: {
        type: Sequelize.STRING
      },
      booth: {
        type: Sequelize.STRING
      },
      technology: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return agriFair;
  };