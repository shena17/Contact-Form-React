const router = require("express").Router();
var http = require("http");
var path = require("path");
var nodemailer = require("nodemailer");

router.post("/email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log(name);
});

module.exports = router;
