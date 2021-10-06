const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();

  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));

  if (!recipe) return null;

  return recipe;
};

const createRecipe = async (data) => {
  const db = await connection();
  const recipeRegistry = await db.collection('recipes')
    .insertOne(data);

  return recipeRegistry;
};

const updateRecipe = async ({ id, name, ingredients, preparation }) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const result = await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  return result;
};

const updateRecipeImage = async ({ id, image }) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const result = await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image } });

  return result;
};

const excludeRecipe = async (id) => {
  const db = await connection();
  const response = await getRecipeById(id);
  
  if (!response) return null;

  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });

  return response;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  updateRecipeImage,
  excludeRecipe,
};