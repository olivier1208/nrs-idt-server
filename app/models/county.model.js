module.exports = (sequelize, Sequelize) => {
    return sequelize.define("county", {
        name: {
            type: Sequelize.STRING
        },
        population: {
            type: Sequelize.INTEGER
        },
    });
};