const express = require("express");
const router = express.Router();

router.get("/panel", (req, res, next) => {
  res.render("admin/panel");
})

router.get("/add-product", (req, res, next) => {
  res.render("admin/add-product");
})

module.exports = router;