const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const { upload } = require('../../middlewares/multer');

const userController = require('../../controllers/userController');
const recipeController = require('../../controllers/recipeController');
const validateJWT = require('../../middlewares/validateJWT');
const validateAdmin = require('../../middlewares/validateAdmin');

app.use(bodyParser.json());

app.use('/images', express.static(path.resolve('src/uploads')));

app.get('/recipes/:id', recipeController.getRecipeById);

app.get('/recipes', recipeController.getAllRecipes);

app.post('/users/admin', validateJWT, validateAdmin, userController.createAdmin);

app.post('/users', userController.createUser);

app.post('/login', userController.loginUser);

app.post('/recipes', validateJWT, recipeController.createRecipe);

app.put('/recipes/:id/image', validateJWT, upload.single('image'),
  recipeController.updateRecipeImage);

app.put('/recipes/:id', validateJWT, recipeController.updateRecipe);

app.delete('/recipes/:id', validateJWT, recipeController.excludeRecipe);

module.exports = app;
