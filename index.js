const express = require("express");
const userRouter = require("./routes/user/userRoutes.js");
const authRouter = require("./routes/auth/authRoutes.js");

const server = express();

server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
