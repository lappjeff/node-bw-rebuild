exports.up = function(knex) {
	return knex.schema.table("users", tbl => {
		tbl.string("meal_plan");
	});
};

exports.down = function(knex) {
	return knex.schema.table("uers", tbl => {
		tbl.dropColumn("meal_plan");
	});
};
