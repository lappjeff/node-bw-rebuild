const Users = require("./user-model");
const db = require("../data/dbConfig");

it("should be running on testing env", () => {
	expect(process.env.DB_ENV).toBe("testing");
});

let testUser = {
	username: "testwoman",
	password: "test",
	email: "testwoman@gmail.com",
	gender: "f",
	name: "test woman",
	activity_lvl: "1-2 days",
	goal: "moderate weight loss",
	height: "5'10",
	age: 27,
	current_weight: 151,
	meal_plan: "3 meals a day"
};

describe("users model tests", () => {
	beforeEach(async () => {
		await db("users").truncate();
	});

	describe("insert", () => {
		it("should add user to database", async () => {
			let users = await db("users");
			expect(users).toHaveLength(0);

			const user = await Users.createUser(testUser);

			users = await db("users");
			expect(users).toHaveLength(1);
		});

		it("should add proper user data to database", async () => {
			let user = await Users.createUser(testUser);

			expect(user.email).toEqual(testUser.email);
		});

		it("should calculate macros properly", async () => {
			let user = await Users.createUser(testUser);

			expect(JSON.parse(user.user_macros)).toEqual({
				dailyCalories: 1775,
				dailyProtein: 133,
				dailyCarbs: 177,
				dailyFat: 58
			});
		});

		it("should calculate meal macros properly", async () => {
			let user = await Users.createUser(testUser);

			expect(JSON.parse(user.meal_macros)).toEqual({
				proteinPerMeal: 44,
				carbsPerMeal: 59,
				fatPerMeal: 19
			});
		});
	});

	describe("update", () => {
		it("should update user", async () => {
			const user = await Users.createUser(testUser);
			expect(user.name).toBe("test woman");

			const updates = {
				name: "updatedUser",
				email: "updatedEmail@gmail.com"
			};

			const updatedUser = await Users.updateUser(user.user_id, updates);
			expect(updatedUser.name).toBe("updatedUser");
			expect(updatedUser.email).toBe("updatedEmail@gmail.com");
		});

		it("should update user macros accurately", async () => {
			const user = await Users.createUser(testUser);
			expect(JSON.parse(user.user_macros)).toEqual({
				dailyCalories: 1775,
				dailyProtein: 133,
				dailyCarbs: 177,
				dailyFat: 58
			});

			const updates = {
				height: "4'5"
			};

			const updatedUser = await Users.updateUser(user.user_id, updates);
			expect(JSON.parse(updatedUser.user_macros)).toEqual({
				dailyCalories: 1682,
				dailyProtein: 126,
				dailyCarbs: 168,
				dailyFat: 55
			});
		});

		it("should update user meal macros accurately", async () => {
			const user = await Users.createUser(testUser);
			expect(JSON.parse(user.meal_macros)).toEqual({
				proteinPerMeal: 44,
				carbsPerMeal: 59,
				fatPerMeal: 19
			});

			const updates = {
				meal_plan: "3 meals and 2 snacks a day"
			};
			const updatedUser = await Users.updateUser(user.user_id, updates);

			expect(JSON.parse(updatedUser.meal_macros)).toEqual({
				proteinPerMeal: 32,
				carbsPerMeal: 44,
				fatPerMeal: 14,
				proteinPerSnack: 16,
				carbsPerSnack: 22,
				fatPerSnack: 7
			});
		});
	});

	describe("delete", () => {
		it("should remove a given user from the database", async () => {
			const user = await Users.createUser(testUser);

			let users = await db("users");

			expect(users).toHaveLength(1);

			await Users.deleteUser(user.user_id);

			users = await db("users");
			expect(users).toHaveLength(0);
		});
	});
});
