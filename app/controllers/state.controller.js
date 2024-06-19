const db = require("../models");
const { state: State, county: County } = db;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const name = req.query.name;
    const replacedName = name.split('+').join(' ');
    const condition = name ? { name: { [Op.iLike]: `%${ replacedName }%` } } : null;

    State.findAll({ where: condition })
        .then(data => {
            res.send({
                data,
                message: "States retrieved successfully. 🎉🎉🎉"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findCountiesByState = (req, res) => {
    const name = req.params.name;
    const replacedName = name.split('+').join(' ');
    State.findOne({ where: { name: replacedName }, include: ["counties"] })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not found State called: " + name
                });
            } else {
                res.send({
                    data: data.counties,
                    message: "Counties retrieved successfully. 🎉🎉🎉"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving State with name=" + name
            });
        });

}

exports.findOne = (req, res) => {
    const id = req.params.id;

    State.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not found State with id " + id
                });
            } else {
                res.send({
                    data,
                    message: "State retrieved successfully. 🎉🎉🎉"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving State with id=" + req.params.id
            });
        });
};

exports.staleStates = (req, res) => {
    const states = require('../../fixtures/USA-states.json');
    res.send({
        data: states,
        message: "Stale states..."
    });

};

// Bonus routes :) Event if it does not makes sense to have them here
exports.update = (req, res) => {
    const id = req.params.id;

    State.update(req.body, {
        where: { id: id }
    })
        .then(code => {
            if (code === 1) {
                res.send({
                    message: "State updated successfully. 🎉🎉🎉"
                });
            } else {
                res.send({
                    message: `Cannot update State with id=${ id }. Maybe State was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating State with id=" + id
            });
        });

};

exports.delete = (req, res) => {
    const id = req.params.id;

    State.destroy({
        where: { id: id }
    })
        .then(code => {
            if (code === 1) {
                res.send({
                    message: "State deleted successfully. 🎉🎉🎉"
                });
            } else {
                res.send({
                    message: `Cannot delete State with id=${ id }. Maybe State was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete State with id=" + id
            });
        });

};