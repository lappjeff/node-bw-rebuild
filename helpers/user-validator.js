module.exports = { validateUser };

function validateUser(user) {
	if (!user.username) {
		throw "Please provide a username";
	}
	if (!user.password) {
		throw "Please provide a password";
	}
	if (!user.email) {
		throw "Please provide a email";
	}
	if (!user.gender || user.gender.length > 1) {
		throw "Please provide a valid gender(M/F)";
	}
	if (!user.activity_lvl) {
		throw "Please provide a weekly activity level: 1-2, 3-4, 5-6, or 7 days.";
	}
	if (!user.goal) {
		throw "Please provide a valid goal: aggressive weight loss, moderate weight loss, weight loss, maintain weight, moderate weight gain, aggressive weight gain";
	}
	if (!user.height) {
		throw "Please provide a valid height in format feet/inches(5'7)";
	}
	if (!user.age) {
		throw "Please provide a valid age";
	}
	if (!user.current_weight) {
		throw "Please provide a valid weight in lbs";
	}
	return true;
}
