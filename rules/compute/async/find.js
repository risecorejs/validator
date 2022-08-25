"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(ctx) {
    if (ctx.options.sequelize) {
        const [table, column] = (Array.isArray(ctx.argument) ? ctx.argument : ctx.argument.split('-'));
        const query = getQuery(ctx.options.sequelize.getDialect(), table, column, ctx.value);
        const [result] = await ctx.options.sequelize.query(query);
        if (!result[0]) {
            return ctx.errorMessage(table);
        }
    }
}
exports.default = default_1;
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
