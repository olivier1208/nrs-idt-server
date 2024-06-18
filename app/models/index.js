const {
    DB,
    USER,
    HOST,
    PASSWORD,
    dialect,
    port,
    pool: {
        max,
        acquire,
        idle,
        min
    }
} = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB, USER, PASSWORD,  {
    host: HOST,
    port,
    dialect,
    operatorsAliases: false,

    pool: {
        max,
        min,
        acquire,
        idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.state = require("./state.model")(sequelize, Sequelize);
db.county = require("./county.model")(sequelize, Sequelize);

db.state.hasMany(db.county, { as: "counties" });
db.county.belongsTo(db.state, {
    foreignKey: "stateId",
    as: "state"
});

module.exports = db;