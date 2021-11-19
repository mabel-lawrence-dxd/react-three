// Create express app
const express = require("express");
const app = express();
const db = require("./db.js");
const dbName = "pfizerDbTest";

// Server port
const HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.use('/api', require('./api'));

// Insert here other API endpoints

// app.get("/employees", (req, res, next) => {
//   var sql = `select * from ${dbName}`;
//   var params = [];
//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// Root endpoint
// app.get("/", (req, res, next) => {
//   res.json({ message: "Ok" });
// });

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});

module.exports = app;