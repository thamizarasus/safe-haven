const express = require('express');
const bodyParser = require('body-parser');
const pool = require("../models/db");
const router = express.Router();

const urlencodedParser = bodyParser.urlencoded();

router.post("/register", urlencodedParser, (req, res) => {
    console.log("INSERTION COMPLETE");
});

module.exports = router;