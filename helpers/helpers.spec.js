const { calculateMacros } = require("./calculateMacros");
const calculateMealMacros = require("./calculateMealMacros");
const { validateUser } = require("./user-validator");

it("should calculate and return accurate macros", () => {
	const testUser = {
		gender: "F",
		activity_lvl: "1-2 days",
		goal: "moderate weight loss",
		height: "5'10",
		age: 27,
		current_weight: 151
	};

	let macros = calculateMacros(testUser);

	expect(macros).toEqual({
		dailyCalories: 1775,
		dailyProtein: 133,
		dailyCarbs: 177,
		dailyFat: 58
	});

	testUser.height = "4'5";
	macros = calculateMacros(testUser);

	expect(macros).toEqual({
		dailyCalories: 1682,
		dailyProtein: 126,
		dailyCarbs: 168,
		dailyFat: 55
	});
});

it("should split macros into a meal plan", () => {
	const macros = {
		dailyCalories: 1775,
		dailyProtein: 133,
		dailyCarbs: 177,
		dailyFat: 58
	};

	let mealMacros = calculateMealMacros(macros, "4 meals a day");

	expect(mealMacros).toEqual({
		proteinPerMeal: 33,
		carbsPerMeal: 44,
		fatPerMeal: 14
	});

	mealMacros = calculateMealMacros(macros, "3 meals a day");

	expect(mealMacros).toEqual({
		proteinPerMeal: 44,
		carbsPerMeal: 59,
		fatPerMeal: 19
	});

	mealMacros = calculateMealMacros(macros, "3 meals and 2 snacks a day");

	expect(mealMacros).toEqual({
		proteinPerMeal: 32,
		carbsPerMeal: 44,
		fatPerMeal: 14,
		proteinPerSnack: 16,
		carbsPerSnack: 22,
		fatPerSnack: 7
	});
});
describe("user data validator", () => {
	const validtestUser = {
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

	const invalidtestUser = {
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

	it("should fail when given an invalid user", async () => {
		expect(() => validateUser(invalidtestUser)).toThrow(
			"Please provide a username"
		);
	});

	it("should return true when given a valid user", () => {
		expect(validateUser(validtestUser)).toBe(true);
	});
});
