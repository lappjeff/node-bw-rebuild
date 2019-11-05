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
		tbl.string("name").notNullable();
		tbl.string("activity_lvl").notNullable();
		tbl.string("goal").notNullable();
		tbl.integer("age").notNullable();
		tbl.decimal("current_weight").notNullable();
		tbl.decimal("height");
		tbl.timestamps(true, true);

		tbl
			.foreign("macro_id")
			.references("user_macros.macro_id")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("users");
};
