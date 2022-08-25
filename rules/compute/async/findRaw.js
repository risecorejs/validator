"use strict";
module.exports = async function (ctx) {
    if (ctx.options.sequelize) {
        const [result] = await ctx.options.sequelize.query(ctx.argument);
        if (!result[0]) {
            return ctx.errorMessage;
        }
    }
};
