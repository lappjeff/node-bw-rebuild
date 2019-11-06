exports.up = function(knex) {
	return knex.schema.createTable("users", tbl => {
		tbl.increments("user_id").primary();

		tbl
			.string("username")
			.notNullable()
			.unique();
		tbl.string("password").notNullable();
		tbl
			.string("email")
			.notNullable()
			.unique();
		tbl.string("gender").notNullable();
		tbl.string("name");
		tbl.string("activity_lvl").notNullable();
		tbl.string("goal").notNullable();
		tbl.string("height").notNullable();
		tbl.integer("age").notNullable();
		tbl.decimal("current_weight").notNullable();
		tbl.json("user_macros");
		tbl.timestamps(true, true);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("users");
};
