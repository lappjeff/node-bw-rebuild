const { calculateMacros } = require("./calculateMacros");
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
