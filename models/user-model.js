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

	const finalMacros = { ...user, user_macros: userMacros };

	const user = await db("users").insert(finalUser);
	console.log(user);
	return user;
}

function getCurrentUser() {}
function findUserById(user_id) {
	return db("users")
		.where({ user_id })
		.first();
}
