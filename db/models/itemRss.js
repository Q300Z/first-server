const mongoose = require('mongoose');

const rssItemSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    pubDate: { type: String, required: true },
    creaDate: { type: String, required: true },
    read: { type: Boolean, required: true },
    readDate: { type: String, required: false },
    flux: {type: String, required: true}
});

module.exports = mongoose.model('itemRss', rssItemSchema);
