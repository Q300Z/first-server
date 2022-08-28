const mongoose = require('mongoose');

const notifSchema = mongoose.Schema({
  id: { type: String, required: true },
  tab: { type: Number, required: true },
  card: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true }
  }

});

module.exports = mongoose.model('Notif', notifSchema);
