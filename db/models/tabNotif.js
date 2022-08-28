const mongoose = require('mongoose');

const tabnotifSchema = mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
});

module.exports = mongoose.model('tabNotif', tabnotifSchema);
