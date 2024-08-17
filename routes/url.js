const express = require('express');
const {handleNewUrl} = require ('../controllers/url.js');

const router = express.Router();

router.post('/', handleNewUrl);

module.exports = router;

