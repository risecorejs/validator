"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(ctx) {
    if (ctx.options.sequelize) {
        const [result] = await ctx.options.sequelize.query(ctx.argument);
        if (!result[0]) {
            return ctx.errorMessage;
        }
    }
}
exports.default = default_1;
