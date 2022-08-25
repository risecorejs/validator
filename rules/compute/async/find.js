"use strict";
/**
 * GET-QUERY
 * @param dialect {TDialects}
 * @param table {string}
 * @param column {string}
 * @param value {any}
 * @return {string}
 */
function getQuery(dialect, table, column, value) {
    switch (dialect) {
        case 'mysql':
            return `SELECT \`${column}\` FROM \`${table}\` WHERE \`${column}\` = '${value}' LIMIT 1`;
        case 'postgres':
            return `SELECT "${column}" FROM "${table}" WHERE "${column}" = '${value}' LIMIT 1`;
    }
}
module.exports = async function (ctx) {
    if (ctx.options.sequelize) {
        const [table, column] = (Array.isArray(ctx.argument) ? ctx.argument : ctx.argument.split('-'));
        const query = getQuery(ctx.options.sequelize.getDialect(), table, column, ctx.value);
        const [result] = await ctx.options.sequelize.query(query);
        if (!result[0]) {
            return ctx.errorMessage(table);
        }
    }
};
