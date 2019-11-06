const helpers = require("./model-helpers");

test("calculateMacros returns accurate macros", () => {
	const testUser = {
		username: "testwoman",
		password: "test",
		email: "testwoman@gmail.com",
		gender: "f",
		name: "test woman",
		activity_lvl: "1-2 days",
		goal: "moderate weight loss",
		height: "5'10",
		age: 27,
		current_weight: 151
	};

	const macros = helpers.calculateMacros(testUser);

	expect(macros).toEqual({
		dailyCalories: 1775,
		dailyProtein: 133,
		dailyCarbs: 177,
		dailyFat: 58
	});
});
