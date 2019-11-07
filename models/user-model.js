const db = require("../data/dbConfig.js");
const calculateMacros = require("../helpers/calculateMacros");
const calculateMealMacros = require("../helpers/calculateMealMacros");

module.exports = {
	findUserById,
	updateUser,
	deleteUser,
	createUser,
	getCurrentUser
};

async function updateUser(user_id, updates) {
	const user = await db("users")
		.where({ user_id })
		.first();

	let updatedUser = { ...user, ...updates };

	const userMacros = JSON.stringify(calculateMacros(updatedUser));
	const mealMacros = JSON.stringify(
		calculateMealMacros(calculateMacros(updatedUser), updatedUser.meal_plan)
	);

	updatedUser = {
		...updatedUser,
		user_macros: userMacros,
		meal_macros: mealMacros
	};

	await db("users")
		.where({ user_id })
		.update(updatedUser);

	return db("users")
		.where({ user_id })
		.first();
}

async function deleteUser(user_id) {
	await db("users")
		.where({ user_id })
		.del();
}

async function createUser(user) {
	const userMacros = calculateMacros(user);
	const mealMacros = calculateMealMacros(userMacros, user.meal_plan);
	const finalUser = {
		...user,
		user_macros: JSON.stringify(userMacros),
		meal_macros: JSON.stringify(mealMacros)
	};

	const [id] = await db("users").insert(finalUser, "id");

	return db("users")
		.where({ user_id: id })
		.first();
}

function getCurrentUser() {}

function findUserById(user_id) {
	return db("users")
		.where({ user_id })
		.first();
}
