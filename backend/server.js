const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const connect = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

dotenv.config();

connect();

const port = process.env.port;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`server runnig on port ${port}`.bgMagenta.white);
});
