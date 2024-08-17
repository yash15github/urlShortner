const express = require('express');
const {connectToMongoDB} = require('./connect');
const urlRoute = require('./routes/url');
const ShortUrl =  require('./models/url');
const app = express();
const PORT = 8001;

app.use(express.json());

app.use("/api/url", urlRoute);
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log(" successful"));

    app.get('/api/:shortId', async (req, res) => {
        const shortId = req.params.shortId;
        const entry = await ShortUrl.findOneAndUpdate({shortId}, { $push: {visitHistory: {timestamp: Date.now()}}});
        if (!entry) return res.status(404).send('No such short URL found');
        res.redirect(entry.redirectUrl);
    });


app.listen(PORT, () => { console.log('listening on port '+ `${PORT}`); });