const shortid = require ("shortid");
const shortUrl = require('../models/url')


async function handleNewUrl(req,res) {
    const body = req.body;
    if(!body.longURL){
        return res.status(400).json({error: 'No URL provided'});
    }
    const myid = shortid();
    await shortUrl.create({
        shortId : myid,
        redirectUrl: body.longURL,
        visitHistory: [],
    });
    const allUrls = await shortUrl.find({});
    return res.render("home", {
        urls : allUrls,
        shortId: myid,
        originalUrl: body.longURL,
        shortUrl: `${req.protocol}://${req.get('host')}/${myid}`,
        message: 'URL created successfully!',
        success: true,
    });
}

module.exports = {
    handleNewUrl,
};