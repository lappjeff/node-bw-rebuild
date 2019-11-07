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
	await db("users")
		.where({ user_id })
		.update(updates);

	const updatedUser = await db("users")
		.where({ user_id })
		.first();

	const userMacros = calculateMacros(updatedUser);

	await db("users")
		.where({ user_id })
		.update({ user_macros: JSON.stringify(userMacros) });

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
