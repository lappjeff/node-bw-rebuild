const knex = require("knex");
const knexConfig = require("../knexfile");
const env = require("dotenv").config();

const environment = env.DB_ENV || "development";

module.exports = knex(knexConfig[environment]);
