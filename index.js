const express = require("express");
const userRouter = require("./routes/userRoutes.js");
const macroRouter = require("./routes/macroRoutes.js");

const server = express();

server.use(express.json());

server.use("/api/macros", macroRouter);
server.use("/api/users", userRouter);

const port = 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
