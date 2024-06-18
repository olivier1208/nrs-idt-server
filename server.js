const express = require("express");
const bodyParser = require("body-parser"),
    swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express")
const cors = require("cors");
require("dotenv").config();

const app = express();

let corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// db.sequelize.sync({ force: true })
//     .then(() => {
//         console.log("⚙️⚙️ Synced db successfully.")
//     })
//     .catch((err) => {
//         console.log("Failed to sync db: " + err.message);
//     });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to IDT/NRS server." });
});

app.use('/api/v1', require("./app/routes")(app))

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;


/** SWAGGER **/
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "NRS Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "NRS/IDT Team",
                url: "https://nrs.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8023",
            },
        ],
    },
    apis: ["./app/routes/*.routes.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.listen(PORT, () => {
    console.log(`🚀🚀 Server up and running on port ${ PORT }.`);
});