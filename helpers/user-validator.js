module.exports = { validateUser };

function validateUser(user) {
	const errors = [];

	const validActivityLevels = new Set([
		"1-2 days",
		"3-4 days",
		"5-6 days",
		"7 days"
	]);
	if (!user.username) {
		errors.push("Please provide a username");
	}
	if (!user.password) {
		errors.push("Please provide a password");
	}
	if (!user.email) {
		errors.push("Please provide a email");
	}
	if (!user.gender || user.gender.length > 1) {
		errors.push("Please provide a valid gender(M/F)");
	}
	if (!user.activity_lvl || !validActivityLevels.has(user.activity_lvl)) {
		errors.push(
			"Please provide a weekly activity level: 1-2, 3-4, 5-6, or 7 days."
		);
	}
	if (!user.goal) {
		errors.push(
			"Please provide a valid goal: aggressive weight loss, moderate weight loss, weight loss, maintain weight, moderate weight gain, aggressive weight gain"
		);
	}
	if (!user.height || !user.height.match(/\d\'\d/)) {
		errors.push("Please provide a valid height in format feet/inches(5'7)");
	}

	if (!user.age) {
		errors.push("Please provide a valid age");
	}
	if (!user.current_weight) {
		errors.push("Please provide a valid weight in lbs");
	}

	if (errors.length > 0) {
		throw errors;
	} else {
		return true;
	}
}
