const router = require("express").Router();
const db = require("../db.js");
// const db = require('../../../../../Pfizer/dxd_client_pfizer_halloffame/sync_service/v1/pfizerDbTest.sqlite3')
const dbName = "pfizerDbTest";
router.get("/:year", async (req, res, next) => {
  const sql = `SELECT * FROM ${dbName} WHERE inductionYear = ? OR secondInductionYear = ?`;
  const year = req.params.year;
  const params = [year,year]
  console.log("in get /year/:year with params: ", req.params);
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;
