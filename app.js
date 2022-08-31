const express = require('express');
//const mongoDB = require('./db/mongoDB');
const mongoose = require('mongoose')
const app = express();


const cardsRoutes = require('./routes/cards.js')
const notifsRoutes = require('./routes/notifs.js')
const rssRoutes = require('./routes/rss.js')



mongoose.connect('mongodb://127.0.0.1:27017/first-server', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((e) => console.log('Connexion à MongoDB échouée ! ' + e));


app.use(express.json()) // for parsing application/json
//app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff', cardsRoutes)
app.use('/api/notif', notifsRoutes)
app.use('/api/rss', rssRoutes)






module.exports = app;

