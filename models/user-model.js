const db = require("../data/dbConfig.js");
const calculateMacros = require("../helpers/calculateMacros");
const calculateMealMacros = require("../helpers/calculateMealMacros");
const bcrypt = require("bcrypt");

module.exports = {
	findByUsername,
	updateUser,
	deleteUser,
	createUser
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

	return findUserById(user_id);
}

async function deleteUser(user_id) {
	await db("users")
		.where({ user_id })
		.del();
}

async function createUser(user) {
	const userMacros = calculateMacros(user);
	const mealMacros = calculateMealMacros(userMacros, user.meal_plan);

	const salt = bcrypt.genSaltSync(8);
	const passHash = bcrypt.hashSync(user.password, salt);

	const finalUser = {
		...user,
		password: passHash,
		user_macros: JSON.stringify(userMacros),
		meal_macros: JSON.stringify(mealMacros)
	};

	const [id] = await db("users").insert(finalUser, "id");

	return findUserById(id);
}

function findByUsername(username) {
	return db("users")
		.where({ username })
		.select(
			"user_id",
			"username",
			"email",
			"gender",
			"name",
			"activity_lvl",
			"goal",
			"height",
			"age",
			"current_weight",
			"user_macros",
			"created_at",
			"updated_at",
			"meal_plan",
			"meal_macros"
		)
		.first();
}
function findUserById(user_id) {
	return db("users")
		.where({ user_id })
		.select(
			"user_id",
			"username",
			"email",
			"gender",
			"name",
			"activity_lvl",
			"goal",
			"height",
			"age",
			"current_weight",
			"user_macros",
			"created_at",
			"updated_at",
			"meal_plan",
			"meal_macros"
		)
		.first();
}
