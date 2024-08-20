const express = require('express');
const {connectToMongoDB} = require('./connect');
const path = require('path');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const ShortUrl =  require('./models/url');
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log(" successful"));


app.set('view engine', "ejs");
app.set('views', path.resolve("./views")); 


app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use("/url", urlRoute);
app.use ("/", staticRoute);
app.get("/test", async (req, res) => {
    const allUrls = await ShortUrl.find({});
    return res.render("home", {
        urls: allUrls,
    });
});

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await ShortUrl.findOneAndUpdate({shortId}, { $push: {visitHistory: {timestamp: Date.now()}}});
    if (!entry) return res.status(404).send('No such short URL found');
    res.redirect(entry.redirectUrl);
});


app.listen(PORT, () => { console.log('listening on port '+ `${PORT}`); });