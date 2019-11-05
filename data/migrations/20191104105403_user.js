exports.up = function(knex) {
	return knex.schema.createTable("users", tbl => {
		tbl.increments("user_id").primary();

		tbl.string("username").notNullable();
		tbl.string("password").notNullable();
		tbl.string("email").notNullable();
		tbl.string("gender").notNullable();
		tbl.string("name").notNullable();
		tbl.string("activity_lvl").notNullable();
		tbl.string("goal").notNullable();
		tbl.integer("age").notNullable();
		tbl.decimal("current_weight").notNullable();
		tbl.decimal("height");
		tbl.timestamps(true, true);

		tbl
			.foreign("user_macro_id")
			.references("user_macros.user_macro_id")
			.unique()
			.onDelete("CASCADE")
			.onUpdate("CASCADE");

		tbl.unique(["username", "email"]);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("users");
};
