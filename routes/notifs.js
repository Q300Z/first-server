const express = require('express')

const router = express.Router()
const notifsCtrl = require('../controllers/notif')



/// ROUTE NOTIF ///

router.get('/get', notifsCtrl.getAllNotifs);

router.post('/post', notifsCtrl.createNotifs);

router.delete('/suppr/:id', notifsCtrl.deleteNotifs);

/// ROUTE tabNOTIF ///

router.get('/tab/get', notifsCtrl.getAllTabs);

router.post('/tab/post', notifsCtrl.createTabs);

router.delete('/tab/suppr/:id', notifsCtrl.deleteTabs);


module.exports = router;