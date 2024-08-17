const shortid = require ("shortid");
const shortUrl = require('../models/url')

async function handleNewUrl(req,res) {
    const body = req.body;
    if(!body ||!body.url){
        return res.status(400).json({error: 'No URL provided'});
    }
    const myid = shortid();
    await shortUrl.create({
        shortId : myid,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({id: myid});
}

module.exports = {
    handleNewUrl,
};