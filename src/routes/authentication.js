const express = require('express')
var router = express.Router()

router.get('/autentication', function (req, res) {
    res.send('hello world')
  })


module.exports = router;