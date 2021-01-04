/******** Ajout d'application *******/
const mongoose = require('mongoose');

/********* Création du schéma mongoDB **********/
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, // Id de l'utilisateur requis
  name: { type: String, required: true }, // Nom de la sauce requis
  manufacturer: { type: String, required: true }, // Fabricant de la sauce requis
  description: { type: String, required: true }, // Description de la sauce requise
  mainPepper: { type: String, required: true }, // Ingrédient principal requis
  imageUrl: { type: String, required: true }, // URL de l'image requise
  heat: { type: Number, min : 0, max : 10, required: true }, // Force de la sauce requise, d'un nombre contenu entre 0 et 10
  likes: { type: Number, required: false, default : 0 }, // Nombre de likes non requis, valeur pas défaut de zéro
  dislikes: { type: Number, required: false, default : 0 }, // Nombre de dislikes non requis, valeur pas défaut de zéro
  usersLiked: [{ type: String, required: false, default : [] }], // Tableau des utilisateurs qui ont liké, non requis, valeur par défaut vide
  usersDisliked: [{ type: String, required: false, default : [] }] // Tableau des utilisateurs qui ont disliké, non requis, valeur par défaut vide
});


/*********** Export du modèle mongoDB Sauce ************/
module.exports = mongoose.model('Sauce', sauceSchema);