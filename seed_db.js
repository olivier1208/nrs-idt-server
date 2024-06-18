const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/test',
});

const db = require('./app/models');

// Directory containing JSON files
const dir = 'fixtures';

fs.readdir(dir, async (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    files.forEach((file, index) => {
        const filePath = path.join(dir, file);

        fs.readFile(filePath, 'utf8', async (err, data) => {
            if (err) {
                console.error(`Error reading file from disk: ${ filePath }`, err);
                return;
            }

            // Parse JSON data
            const counties = JSON.parse(data);

            // Extract the filename without the extension to use as the state name
            const stateName = path.basename(file, path.extname(file));
            if (stateName === 'USA-states') {
                return;
            }
            const state = await db.state.create({ name: stateName });

            // Import data into PostgreSQL
            for (const county of counties) {
                try {
                    await db.county.create({
                        name: county.county,
                        population: county.population,
                        stateId: state.id
                    });
                } catch (err) {
                    console.error(`Error importing data into PostgreSQL: ${ filePath }`, err);
                }
            }
        });
    });
});

pool.end();