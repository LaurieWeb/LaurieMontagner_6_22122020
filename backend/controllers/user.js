/*********** Ajout d'application *********/
const bcrypt = require('bcrypt')        // Pour crypter string
const jwt = require('jsonwebtoken'); // Génère jeton token d'authentification

/******** Importation du model User *********/ 
const User = require('../models/User')

/******** Fonction de création utilisateur *******/
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Cryptage du mot de passe en faisant 10 passes
      .then(hash => {
        const user = new User({
          email: req.body.email, // Récupération mail
          password: hash // Récupération mot de passe crypté
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

/********** Fonction d'authentification *********/  
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) { // Si l'user n'existe pas
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // Comparaison cryptée des mots de passe
          .then(valid => {
            if (!valid) { // Si mot de passe non valide
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id, // Renvoi de l'id utilisateur
              token: jwt.sign( // Création d'un jeton token web JSON
                { userId: user._id }, // Contenant l'id utilisateur
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' } // Avec une date d'expiration
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };