exports.up = function(knex) {
	return knex.schema.createTable("user_macros", tbl => {
		tbl.increments("user_macro_id");

		tbl.json("macros").notNullable();
		tbl.timestamps(true, true);
	});
};

exports.down = function(knex) {
	return knex.dropTableIfExists("user_macros");
};
