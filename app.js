const express = require('express');
//const mongoDB = require('./db/mongoDB');
const mongoose = require('mongoose')
const app = express();

const Thing = require('./db/models/Thing.js')


mongoose.connect('mongodb://127.0.0.1:27017/first-server', { useNewUrlParser: true, useUnifiedTopology: true})
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

app.get('/api/stuff/get/:id', (req, res, next) => {
  Thing.findOne({ id: req.params.id })
    .then(thing => (res.status(200).json(thing)))
    .catch(error => res.status(404).json({ error }));
  console.log("GET 200: /api/stuff/get/" + req.params.id)
});
app.get('/api/stuff/get', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}))
  console.log("GET 200: /api/stuff/get")
});
app.post('/api/stuff/post', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  })
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet créé !' }))
    .catch((error) => res.status(400).json({ error }));
  console.log("POST 201: /api/stuff/post")
})
app.delete('/api/stuff/suppr/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  console.log("DELETE 200: /api/stuff/suppr/" + req.params.id)
});
module.exports = app;

