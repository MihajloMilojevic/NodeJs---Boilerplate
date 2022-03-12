require("dotenv").config();
require("express-async-errors");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const express = require('express');
const server = express();

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const port = process.env.PORT || 5000;

server.set('trust proxy', 1);
server.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // limit each IP to 100 requests per windowMs
  })
);
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(xss());

// server.use(express.static("public"))

server.get("/", (req, res) => res.send("Hello"))

server.use(notFound);
server.use(errorHandler);

server.listen(port, () => console.log(`Server slusa na portu ${port}`))