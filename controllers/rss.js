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
                        var fluxID = flux[f]._id
                        await itemRss.find()
                            .then(async items => {
                                for (r in rss.rss.channel.item) {
                                    if (items.find(el => el.title == rss.rss.channel.item[r].title && el.link == rss.rss.channel.link + rss.rss.channel.item[r].link) === undefined) {
                                        console.log(`${rss.rss.channel.item[r].title} ajouté !`)
                                        const item = new itemRss({
                                            title: rss.rss.channel.item[r].title,
                                            description: rss.rss.channel.item[r].description,
                                            link: rss.rss.channel.link + rss.rss.channel.item[r].link,
                                            pubDate: rss.rss.channel.item[r].pubDate,
                                            creaDate: dateUTC,
                                            read: false,
                                            flux: fluxID
                                        });
                                        await item.save()
                                    }
                                }
                            })
                            .catch(error => res.status(400).json({ error }))
                        await fluxRss.updateOne({ _id: fluxID }, { upadateDate: dateUTC }).then().catch(error => res.status(400).json({ error }))
                    }
                }))
                .catch((e) => console.log(e));

        }
        await itemRss.find()
            .then(items => res.send(items))
            .catch(error => res.status(400).json({ error }))
    }).catch(error => res.status(400).json({ error }))
}

exports.modifyRss = async (req, res, next) => {
    const dateUTC = new Date().toUTCString()
    item = req.body
    item = { ...item, readDate: dateUTC }
    //console.log(item)
    itemRss.updateOne({ _id: req.params.id }, { ...item, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object updated !' }))
        .catch(error => res.status(400).json({ error }));
    console.log("POST 200: /api/rss/update/" + req.params.id)
}

exports.getFlux = (req, res, next) => {
    console.log("GET 200: /api/rss/get/flux")
    fluxRss.find()
        .then(flux => res.status(200).json(flux))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteFlux = async (req, res, next) => {
    await fluxRss.findOne({ _id: req.params.id }).then(async flux => {
        await itemRss.deleteMany({ flux: flux._id })
            .then(async () => {
                fluxRss.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(400).json({ deleteMany: error }))
    }).catch(error => res.status(400).json({ error }))
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
        .then((response) => res.status(201).format({
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
                    .then()
                    .catch((error) => res.status(400).json({ error }));
                await fluxRss.findOne({ title: req.body.title }).then(async flux => {
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
                                        flux: flux._id
                                    });
                                    item.save()
                                }
                            }
                        })
                        .catch(error => res.status(400).json({ error }))
                }).catch(error => res.status(400).json({ error }))
                console.log("POST 201: /api/rss/post/flux")
            },
        })).catch(error => res.status(400).json({ error }))

}