const db = require("../data/dbConfig.js");
const { calculateMacros } = require("./model-helpers");

module.exports = {
	findUserById,
	updateUser,
	deleteUser,
	createUser,
	getCurrentUser
};

function updateUser(user_id, updates) {}

function deleteUser(user_id) {}

async function createUser(user) {
	const userMacros = calculateMacros(user);
	const finalUser = { ...user, user_macros: JSON.stringify(userMacros) };

	const [id] = await db("users").insert(finalUser, "id");

	return id;
}

function getCurrentUser() {}

function findUserById(user_id) {
	return db("users")
		.where({ user_id })
		.first();
}
