const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes
app.use(bodyParser.json());

// Connexion à la base de données MySQL (ajustez les détails de connexion)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Définissez le modèle pour la table Users
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Tentative de synchronisation du modèle avec la base de données
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(async (error) => {
    console.error('Database connection error. Using default credentials.');
    console.error(error);

    // Utiliser les informations de connexion par défaut
    await User.findOrCreate({
      where: { username: 'admin', password: 'password' },
      defaults: { username: 'admin', password: 'password' },
    });
  });

// Endpoint pour la connexion
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Recherchez l'utilisateur dans la base de données
    const user = await User.findOne({
      where: {
        username,
        password,
      },
    });

    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
