const Notif = require('../db/models/Notif.js')
const tabNotif = require('../db/models/tabNotif.js');

exports.getAllNotifs = (req, res, next) => {
    Notif.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }))
    console.log("GET 200: /api/notif/get")
}

exports.createNotifs = (req, res, next) => {
    const notif = new Notif({
        ...req.body
    })
    notif.save()
        .then(() => res.status(201).json({ message: 'Objet créé !' }))
        .catch((error) => res.status(400).json({ error }));
    console.log("POST 201: /api/notif/post")
}

exports.deleteNotifs = (req, res, next) => {
    Notif.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    console.log("DELETE 200: /api/notif/suppr/" + req.params.id)
}

exports.getAllTabs = (req, res, next) => {
    tabNotif.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }))
    console.log("GET 200: /api/notif/get")
}

exports.createTabs = (req, res, next) => {
    const tabnotif = new tabNotif({
        ...req.body
    })
    tabnotif.save()
        .then(() => res.status(201).json({ message: 'Objet créé !' }))
        .catch((error) => res.status(400).json({ error }));
    console.log("POST 201: /api/notif/post")
}

exports.deleteTabs = (req, res, next) => {
    tabNotif.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    console.log("DELETE 200: /api/notif/tab/suppr/" + req.params.id)
}