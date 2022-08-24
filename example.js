"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
(0, index_1.default)({
    name: 'Abdulsalam',
    email: 'amenov.abdulsalam@gmail.com'
}, {
    name: 'required|string|max:200',
    email: 'required|email|max:200'
}).then((errors) => {
    console.log(errors);
});
