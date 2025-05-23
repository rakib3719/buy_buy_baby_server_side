"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const port = process.env.PORT || "5000";
dotenv_1.default.config();
app_1.default.listen(port, () => {
    console.log(`Hello Baby server runnig on ${port}`);
});
