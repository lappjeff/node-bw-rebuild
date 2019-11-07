const validators = require("./user-validator");

module.exports = calculateMacros;

function calculateMacros(user) {
	const bmrFormulas = {
		m: (weight, height, age) => 66 + 6.23 * weight + 12.7 * height - 6.8 * age,
		f: (weight, height, age) => 655 + 4.35 * weight + 4.7 * height - 4.5 * age
	};

	const activityMultipliers = {
		"0 days": 1.2,
		"1-2 days": 1.375,
		"3-4 days": 1.55,
		"5-6 days": 1.725,
		"7 days": 1.9
	};

	const goalMultipliers = {
		"aggressive weight loss": 0.8,
		"moderate weight loss": 0.85,
		"weight loss": 0.9,
		"maintain weight": 1,
		"moderate weight gain": 1.1,
		"aggressive weight gain": 1.15
	};

	const heightArray = user.height.split("'");
	const heightInches = heightArray[0] * 12 + parseInt(heightArray[1]);

	const bmr = bmrFormulas[user.gender.toLowerCase()](
		user.current_weight,
		heightInches,
		user.age
	);

	const dailyCalories = Math.floor(
		bmr *
			activityMultipliers[user.activity_lvl.toLowerCase()] *
			goalMultipliers[user.goal.toLowerCase()]
	);

	const [dailyProtein, dailyCarbs, dailyFat] = [
		Math.floor(dailyCalories * 0.075),
		Math.floor(dailyCalories * 0.1),
		Math.floor(dailyCalories * 0.033)
	];

	const userMacros = {
		dailyCalories,
		dailyProtein,
		dailyCarbs,
		dailyFat
	};

	return userMacros;
}
