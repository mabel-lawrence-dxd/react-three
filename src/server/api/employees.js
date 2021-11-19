const router = require("express").Router();
const db = require("../db.js");
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

router.get("/:id", async (req, res, next) => {
  const sql = `select * from ${dbName} where id = ?`;
  const params = req.params;
  console.log("in get /employee/:id with params: ", req.params);
  db.all(sql, params.id, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;
