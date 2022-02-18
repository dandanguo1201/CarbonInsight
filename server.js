"use strict";

const express = require("express");

const rateLimit = require("express-rate-limit");

const dataRouter = require("./app/api/data.js");

const viewsPath = __dirname + '/app/views/';

const manualPath = __dirname + '/app/assets/manual.pdf';

const app = express();

app.use(express.static(viewsPath));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use('/api', dataRouter);

app.get('/manual', function (req, res) {
  res.sendFile(manualPath)
})

app.get('/*', function (req, res) {
  res.sendFile(viewsPath + "index.html");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
