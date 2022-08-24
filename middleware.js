"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const index_1 = __importDefault(require("./index"));
/**
 * MAIN
 * @param options {IOptions}
 * @return {express.Handler}
 */
function main(options) {
    return function (req, res, next) {
        req.validator = (rules) => (0, index_1.default)(req.body, rules, options);
        next();
    };
}
module.exports = main;
