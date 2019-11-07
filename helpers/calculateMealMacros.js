module.exports = calculateMealMacros;

function calculateMealMacros(macros, mealPlan) {
	const validMealPlans = new Set([
		"4 meals a day",
		"3 meals a day",
		"3 meals and 2 snacks a day"
	]);

	if (validMealPlans.has(mealPlan)) {
		let mealMacros = undefined;
		switch (mealPlan) {
			case "4 meals a day":
				mealMacros = {
					proteinPerMeal: Math.floor(macros.dailyProtein / 4),
					carbsPerMeal: Math.floor(macros.dailyCarbs / 4),
					fatPerMeal: Math.floor(macros.dailyFat / 4)
				};
				return mealMacros;
			case "3 meals a day":
				mealMacros = {
					proteinPerMeal: Math.floor(macros.dailyProtein / 3),
					carbsPerMeal: Math.floor(macros.dailyCarbs / 3),
					fatPerMeal: Math.floor(macros.dailyFat / 3)
				};
				return mealMacros;
			case "3 meals and 2 snacks a day":
				const proteinPerSnack = Math.floor(macros.dailyProtein / 8);
				const carbsPerSnack = Math.floor(macros.dailyCarbs / 8);
				const fatPerSnack = Math.floor(macros.dailyFat / 8);

				mealMacros = {
					proteinPerMeal: proteinPerSnack * 2,
					carbsPerMeal: carbsPerSnack * 2,
					fatPerMeal: fatPerSnack * 2,
					proteinPerSnack,
					carbsPerSnack,
					fatPerSnack
				};
				return mealMacros;
			default:
				return null;
		}
	} else {
		throw "Invalid meal plan. Please select either `4 meals a day`, `3 meals a day`, or `3 meals and 2 snacks a day`";
	}
}
