// Create express app
const express = require("express");
const app = express();

// Server port
const HTTP_PORT = 3001;
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.use('/api', require('./api'));

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(1);
});

module.exports = app;