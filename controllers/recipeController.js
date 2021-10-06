const service = require('../services/recipeService');
const messages = require('../helpers/validationMessages');

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await service.getAllRecipes();

    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await service.getRecipeById(id);

    if (recipe === null) return res.status(404).json(messages.RECIPE_NOT_FOUND);

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(404).json(messages.RECIPE_NOT_FOUND);
  }
};

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const id = _id.toString();
    const result = await service.createRecipe({ name, ingredients, preparation, userId: id });

    if (result === false) return res.status(400).json(messages.INVALID_ENTRY);

    return res.status(201).json({ recipe: {
      name,
      ingredients,
      preparation,
      userId: id,
      _id: result.insertedId,
    } });
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const { _id } = req.user;
    const getId = _id.toString();
    
    await service.updateRecipe({ id, name, ingredients, preparation });

    return res.status(200).json({
      _id: id,
      name,
      ingredients,
      preparation,
      userId: getId,
    });
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  }
};

const updateRecipeImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    await service.updateRecipeImage({ id, image: `localhost:3000/src/uploads/${id}.jpeg` });

    const response = await service.getRecipeById(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  }
};

const excludeRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const exclude = await service.excludeRecipe(id);

    if (exclude === null) return res.status(404).json(messages.RECIPE_NOT_FOUND);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  excludeRecipe,
  updateRecipeImage,
};