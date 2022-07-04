const express = require("express");

const router = express.Router();

//get data
router.get('/',(req,res) => {
    res.send("connected to server");
})

module.exports = router;