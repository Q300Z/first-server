const Thing = require('../db/models/Thing.js')

exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    })
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet créé !' }))
        .catch((error) => res.status(400).json({ error }));
    console.log("POST 201: /api/stuff/post")
}

exports.getAllThing = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }))
    console.log("GET 200: /api/stuff/get")
}

exports.getOneThing = (req, res, next) => {
    //console.log(req.params.id)
    Thing.findOne({ _id: req.params.id })
        .then(thing => (res.status(200).json(thing)))
        .catch(error => res.status(404).json({ error }));
    console.log("GET 200: /api/stuff/get/" + req.params.id)
}

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    console.log("DELETE 200: /api/stuff/suppr/" + req.params.id)
}

exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object updated !' }))
        .catch(error => res.status(400).json({ error }));
    console.log("POST 201: /api/stuff/update/" + req.params.id)
}