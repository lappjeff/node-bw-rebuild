const { Schema } = require("validate");

module.exports = { validateUser };

function validateUser(user) {
	const errors = [];
	let isValidUser = true;

	if (!user.username) {
		errors.push("Please provide a username");
		isValidUser = false;
	}
	if (!user.password) {
		errors.push("Please provide a password");
		isValidUser = false;
	}
	if (!user.email) {
		errors.push("Please provide a email");
		isValidUser = false;
	}
	if (!user.gender || user.gender.length > 1) {
		errors.push("Please provide a valid gender(M/F)");
		isValidUser = false;
	}
	if (!user.activity_lvl) {
		errors.push(
			"Please provide a valid weekly activity level: 1-2, 3-4, 5-6, or 7 days. "
		);
		isValidUser = false;
	}
	if (!user.goal) {
		errors.push(
			"Please provide a valid goal: aggressive weight loss, moderate weight loss, weight loss, maintain weight, moderate weight gain, aggressive weight gain"
		);
		isValidUser = false;
	}
	if (!user.height) {
		errors.push("Please provide a valid height in format feet/inches(5'7)");
		isValidUser = false;
	}
	if (!user.age) {
		errors.push("Please provide a valid age");
		isValidUser = false;
	}
	if (!user.current_weight) {
		errors.push("Please provide a valid weight in lbs");
		isValidUser = false;
	}

	return { isValidUser, errors };
}
