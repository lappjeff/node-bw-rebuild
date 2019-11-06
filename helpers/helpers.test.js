const { calculateMacros } = require("./calculateMacros");

it("should calculate and return accurate macros", () => {
	const testUser = {
		gender: "F",
		activity_lvl: "1-2 days",
		goal: "moderate weight loss",
		height: "5'10",
		age: 27,
		current_weight: 151
	};

	const macros = calculateMacros(testUser);

	expect(macros).toEqual({
		dailyCalories: 1775,
		dailyProtein: 133,
		dailyCarbs: 177,
		dailyFat: 58
	});
});
