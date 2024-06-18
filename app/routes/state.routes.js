
/**
 * @swagger
 * components:
 *   schemas:
 *     State:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the state
 *         name:
 *           type: string
 *           description: The name of the state
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the state was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the state was last updated
 *       example:
 *         id: 1
 *         name: California
 *         createdAt: 2022-03-10T04:05:06.157Z
 *         updatedAt: 2022-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * /api/v1/states:
 *   get:
 *     summary: Retrieve a list of states
 *     responses:
 *       200:
 *         description: A list of states
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/State'
 */

/**
 * @swagger
 * /api/v1/states/{id}:
 *   get:
 *     summary: Retrieve a single state
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the state to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single state
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 */

/**
 * @swagger
 * /api/v1/states/{id}:
 *   put:
 *     summary: Update a state
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the state to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *     responses:
 *       200:
 *         description: The updated state
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 */

/**
 * @swagger
 * /api/v1/states/{id}:
 *   delete:
 *     summary: Delete a state
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the state to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted state
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 */

/**
 * @swagger
 * /api/v1/states/{id}/counties:
 *   get:
 *     summary: Retrieve a list of counties by state
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the state to retrieve counties
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of counties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/County'
 */
module.exports = app => {
    const states = require("../controllers/state.controller.js");

    const router = require("express").Router();

    // Retrieve all States
    router.get("/", states.findAll);

    // stale states
    router.get("/stale", states.staleStates);

    // counties by state
    router.get("/:name/counties", states.findCountiesByState);

    // Retrieve a single State with id
    router.get("/:id", states.findOne);

    // Update a State with id
    router.put("/:id", states.update);

    // Delete a State with id
    router.delete("/:id", states.delete);

    app.use('/api/v1/states', router);
}