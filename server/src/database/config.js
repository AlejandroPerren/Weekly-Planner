// Ensure that the Sequelize CLI understands TypeScript when running migrations or seeds.
require('ts-node/register');

// Get the environment variables from the .env file
const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = require('./env')

// Export the database configuration so that the Sequelize CLI can read it.
module.exports = {
   development: {
    username: DB_USERNAME || "user",
    password: DB_PASSWORD || "password",
    database: DB_NAME || "weeklyplanner",
    host: DB_HOST || "localhost", 
    port: DB_PORT || 3307,
    dialect: DB_DIALECT
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST || "db",
    port: DB_PORT || 3306,
    dialect: DB_DIALECT
  }
};