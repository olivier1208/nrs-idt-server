const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/test',
});

const db = require('./app/models');

const dir = 'fixtures';

fs.readdir(dir, async (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    // let's wipe out the database first
    await db.sequelize.sync({ force: true });

    files.forEach((file, index) => {
        const filePath = path.join(dir, file);

        fs.readFile(filePath, 'utf8', async (err, data) => {
            if (err) {
                console.error(`Error reading file from disk: ${ filePath }`, err);
                return;
            }

            const counties = JSON.parse(data);
            const stateName = path.basename(file, path.extname(file));
            if (stateName === 'USA-states') {
                return;
            }
            const state = await db.state.create({ name: stateName });

            for (const county of counties) {
                try {
                    await db.county.create({
                        name: county.county,
                        population: county.population,
                        stateId: state.id
                    });
                } catch (err) {
                    console.error(`Error importing data to DB: ${ filePath }`, err);
                }
            }
        });
    });
});

pool.end();