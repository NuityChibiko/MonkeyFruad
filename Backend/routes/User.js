const express = require("express"),
  passport = require("passport");
(multer = require("multer")), (router = express.Router());

router.post("/signup", function (req, res) {
  res.json({ success: true });
});
router.post("/remember", function (req, res) {
  res.json({ success: true });
});
router.post("/login", function (req, res) {
  res.json({ success: true });
});
router.get("/:id", function (req, res) {
    const userID = req.params.id;
  res.json({ success: true });
});
module.exports = router;
