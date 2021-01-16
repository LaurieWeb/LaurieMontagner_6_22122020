/*********** Ajout d'application *********/
const multer = require('multer');

/*********** Déclaration des formats d'image acceptés *********/
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

/*********** Fonction de stockage des fichiers *********/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  }, // Déclaration du dossier de stockage des fichiers 
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); //Nom du fichier = nom d'origine + remplacer les espaces par des underscores 
    const extension = MIME_TYPES[file.mimetype]; // Constante dictionnaire de type MIME pour résoudre l'extension de fichier 
    callback(null, name + Date.now() + '.' + extension); // Ajout d'un timestamp
  }
});

/********* Export du module *********/
module.exports = multer({storage: storage}).single('image'); // Envoi de la constante storage qui accepte les fichiers images