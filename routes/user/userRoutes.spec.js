const request = require("supertest");

const Users = require("../../models/user-model");
const db = require("../../data/dbConfig");

it("should be running on testing env", () => {
	expect(process.env.DB_ENV).toBe("testing");
});

describe("users model tests", () => {
	beforeEach(async () => {
		await db("users").truncate();
	});

	describe("insert", () => {
		it("should add user to database", async () => {
			let users = await db("users");
			expect(users).toHaveLength(0);

			await Users.createUser({
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
			});

			users = await db("users");
			expect(users).toHaveLength(1);
		});
	});
});
