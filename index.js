const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile");
const userRouter = require("./routes/userRoutes.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.use("/api/users", userRouter);

const port = 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
