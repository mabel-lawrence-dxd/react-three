const sqlite3 = require("sqlite3").verbose();
const dbName = 'pfizerDbTest'

// open database in memory
let db = new sqlite3.Database("./src/server/pfizerDbTest.sqlite3", async (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Connected to ${dbName}`);
});

module.exports  = db;