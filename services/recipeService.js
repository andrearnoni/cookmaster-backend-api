const RecipesModel = require('../models/recipeModel');

const validateFieldsRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return false;

  return true;
};

const getAllRecipes = async () => {
  const recipes = await RecipesModel.getAllRecipes();

  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await RecipesModel.getRecipeById(id);

  if (!recipe) return null;

  return recipe;
};

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const validation = validateFieldsRecipe(name, ingredients, preparation);

  if (!validation) return false;

  return RecipesModel.createRecipe({ name, ingredients, preparation, userId });
};

const updateRecipe = async ({ id, name, ingredients, preparation }) => {
  const validation = validateFieldsRecipe(name, ingredients, preparation);

  if (!validation) return false;

  return RecipesModel.updateRecipe({ id, name, ingredients, preparation });
};

const updateRecipeImage = async ({ id, image }) => RecipesModel
  .updateRecipeImage({ id, image });

const excludeRecipe = async (id) => {
  const exclude = await RecipesModel.excludeRecipe(id);

  if (!exclude) return null;

  return exclude;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  updateRecipeImage,
  excludeRecipe,
};