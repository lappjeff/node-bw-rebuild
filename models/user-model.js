const db = require("../data/dbConfig.js");
const { calculateMacros } = require("../helpers/calculateMacros");

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

	updatedUser = { ...updatedUser, user_macros: userMacros };

	await db("users")
		.where({ user_id })
		.update(updatedUser);

	return db("users")
		.where({ user_id })
		.first();
}

function deleteUser(user_id) {}

async function createUser(user) {
	const userMacros = calculateMacros(user);
	const finalUser = { ...user, user_macros: JSON.stringify(userMacros) };

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
