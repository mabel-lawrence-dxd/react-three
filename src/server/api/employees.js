const router = require("express").Router();
const db = require("../db.js");
// const db = require('../../Pfizer/dxd_client_pfizer_halloffame/sync_service/v1/pfizerDbTest.sqlite3')
const dbName = "pfizerDbTest";

router.get("/", (req, res, next) => {
  const sql = `select * from ${dbName}`;
  const params = req.params;
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.get("/id/:id", async (req, res, next) => {
  const sql = `select * from ${dbName} where id = ?`;
  const params = req.params;
  console.log("in get /employee/id/:id with params: ", req.params);
  db.all(sql, params.id, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.get("/name/:name", async (req, res, next) => {
    const name = req.params;
    const params = `%${name.name}%`
    const sql = `select * from ${dbName} where employeeName like ?`;
    console.log("in get /employee/name/:name with name: ", name.name);
    db.all(sql, [params], (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

module.exports = router;
