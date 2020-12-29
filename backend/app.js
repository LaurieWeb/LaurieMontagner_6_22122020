/***** Ajout d'applications ************/
const express = require('express');
const app = express(); // Mise en fonctionnement de Express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/****** Déclaration des routes *********/
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
const path = require('path');

/******** Connexion à la base de donnée MongoDB ******/
mongoose.connect('mongodb+srv://user1:usertraining@cluster0.9mdwx.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/*********** Déclaration des Headers ******/
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*'); // Permet d'accèder à l'API depuis n'importe quelle origine
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, HttpHeaders'); // Ajoute les types de headers mentionnés aux requêtes envoyées vers l'API
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Permet d'envoyer des requêtes avec les méthodes mentionnées
   next();
 });

/******** Conversion du body *******/
app.use(bodyParser.json());

/******* Déclaration des fichiers routes *********/ 
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

/********** Envoi de la requête *********/
module.exports = app;