exports.up = function(knex) {
	return knex.schema.table("users", tbl => {
		tbl.json("meal_macros");
	});
};

exports.down = function(knex) {
	return knex.schema.table("users", tbl => {
		tbl.dropColumn("meal_macros");
	});
};
