const express = require('express')
const router = express.Router()


const rssCtrl = require('../controllers/rss')


router.get('/get', rssCtrl.getAllRss);
router.get('/get/flux', rssCtrl.getFlux)
router.delete('/suppr/flux/:id', rssCtrl.deleteFlux)
router.post('/post/flux', rssCtrl.createFlux)
router.put('/put/flux/:id', rssCtrl.modifyFlux)

module.exports = router;