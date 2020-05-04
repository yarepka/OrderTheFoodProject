const express = require("express");
const router = express.Router();

router.get("/panel", (req, res, next) => {
  res.render("admin/panel");
})

module.exports = router;