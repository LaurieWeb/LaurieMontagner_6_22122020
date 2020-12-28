/********** Ajout d'application ********/
const express = require('express');
const router = express.Router();

/********* Importation du controllers **********/
const userCtrl = require('../controllers/user');

/********* Déclaration des routes ************/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

/********* Envoi du router *********/
module.exports = router;