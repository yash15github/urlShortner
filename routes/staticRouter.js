const express = require('express');
const router = express.Router();
const ShortUrl = require('../models/url')


router.get('/', async(req, res) => {
    const allUrls = await ShortUrl.find({});
    return res.render("home" , {
        urls : allUrls,
    });
});
module.exports = router;