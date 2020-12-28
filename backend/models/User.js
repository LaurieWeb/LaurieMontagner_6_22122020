/******** Ajout d'application *******/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/********* Création du schéma mongoDB **********/
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Email de l'utilisateur unique 
  password: { type: String, required: true } // Mot de passe de l'utilisateur 
});

/******* Passage au plugin de validation d'objet unique *******/
userSchema.plugin(uniqueValidator);

/*********** Export du modèle mongoDB User ************/
module.exports = mongoose.model('User', userSchema);