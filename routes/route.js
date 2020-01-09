const express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.json('Hello');
});

module.exports = router;
