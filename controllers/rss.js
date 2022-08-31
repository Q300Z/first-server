const axios = require('axios')
const parser = require('xml2json');

const fluxRss = require('../db/models/fluxRss.js');
const itemRss = require('../db/models/itemRss');

exports.getAllRss = async (req, res, next) => {
    console.log("GET 200: /api/rss/get")
    await fluxRss.find().then(async flux => {
        for (f in flux) {
            await axios
                .get(flux[f].link)
                .then((response) => res.status(200).format({
                    'application/xml': async function () {
                        var rss = parser.toJson(response.data)
                        const dateUTC = new Date().toUTCString()
                        var rss = JSON.parse(rss)
                        await itemRss.find()
                            .then(items => {
                                for (r in rss.rss.channel.item) {
                                    if (items.find(el => el.title == rss.rss.channel.item[r].title) === undefined) {
                                        console.log(`${rss.rss.channel.item[r].title} ajouté !`)
                                        const item = new itemRss({
                                            title: rss.rss.channel.item[r].title,
                                            description: rss.rss.channel.item[r].description,
                                            link: rss.rss.channel.link + rss.rss.channel.item[r].link,
                                            pubDate: rss.rss.channel.item[r].pubDate,
                                            creaDate: dateUTC,
                                            read: false,
                                            flux: flux[f].title
                                        });
                                        item.save()
                                    }
                                }
                            })
                            .catch(error => console.log(error))
                        fluxRss.updateOne({ _id: flux[f]._id }, { upadateDate: dateUTC }).then().catch(error => console.log(error))
                    }
                }))
                .catch((e) => console.log(e));

        }
        await itemRss.find()
            .then(items => res.send(items))
            .catch(error => console.log(error))
    }).catch(error => console.log(error))
}

exports.getFlux = (req, res, next) => {
    console.log("GET 200: /api/rss/get/flux")
    fluxRss.find()
        .then(flux => res.status(200).json(flux))
        .catch(error => console.log(error))
}

exports.deleteFlux = (req, res, next) => {
    fluxRss.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    console.log("DELETE 200: /api/rss/suppr/flux" + req.params.id)
}

exports.modifyFlux = (req, res, next) => {
    fluxRss.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object updated !' }))
        .catch(error => res.status(400).json({ error }));
    console.log("POST 201: /api/rss/update/flux" + req.params.id)
}

exports.createFlux = async (req, res, next) => {
    await axios
        .get(req.body.link)
        .then((response) => res.status(200).format({
            'application/xml': async function () {
                var rss = parser.toJson(response.data)
                const dateUTC = new Date().toUTCString()
                var rss = JSON.parse(rss)

                const flux = new fluxRss({
                    title: req.body.title,
                    description: rss.rss.channel.description || "NO DESCRIPTION",
                    link: req.body.link,
                    creaDate: dateUTC,
                    upadateDate: dateUTC
                })
                flux.save()
                    .then(() => res.status(201).json({ message: 'Objet créé !' }))
                    .catch((error) => res.status(400).json({ error }));

                await itemRss.find()
                    .then(items => {
                        for (r in rss.rss.channel.item) {
                            if (items.find(el => el.title == rss.rss.channel.item[r].title) === undefined) {
                                console.log(`${rss.rss.channel.item[r].title} ajouté !`)
                                const item = new itemRss({
                                    title: rss.rss.channel.item[r].title,
                                    description: rss.rss.channel.item[r].description,
                                    link: rss.rss.channel.link + rss.rss.channel.item[r].link,
                                    pubDate: rss.rss.channel.item[r].pubDate,
                                    creaDate: dateUTC,
                                    read: false,
                                    flux: req.body.title
                                });
                                item.save()
                            }
                        }
                    })
                    .catch(error => console.log(error))

                console.log("POST 201: /api/rss/post/flux")
            }
        })).catch(error => console.log(error))

}