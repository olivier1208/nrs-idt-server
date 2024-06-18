module.exports = (sequelize, Sequelize) => {
    return sequelize.define("state", {
        name: {
            type: Sequelize.STRING
        }
    });
};