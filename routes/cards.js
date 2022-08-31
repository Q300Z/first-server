const express = require('express')
const router = express.Router()

const thingCtrl = require('../controllers/cards')


router.get('/get/:id', thingCtrl.getOneThing);

router.get('/get', thingCtrl.getAllThing);

router.post('/post', thingCtrl.createThing);

router.delete('/suppr/:id', thingCtrl.deleteThing);

router.put('/update/:id', thingCtrl.modifyThing)

module.exports = router;