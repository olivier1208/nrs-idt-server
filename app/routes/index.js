module.exports = app => {
    const stateRoutes = require("./state.routes");

    const router = require("express").Router();

    stateRoutes(app);

    router.use("/states", stateRoutes);

    return router;
}