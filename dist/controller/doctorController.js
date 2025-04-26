"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDoctor = void 0;
const doctorModels_1 = require("../models/doctorModels");
const addDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const exist = yield doctorModels_1.doctorModel.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
        if (exist) {
            res.status(400).json({
                message: 'email already exist'
            });
            return;
        }
        const newDoctor = new doctorModels_1.doctorModel(data);
        const saveDoctor = yield newDoctor.save();
        res.status(200).json({
            mesage: "Success",
            data: saveDoctor
        });
    }
    catch (error) {
        console.log(error, 'ki error hoise re');
        res.status(401).json({
            message: 'something went wrong',
            error: error
        });
    }
});
exports.addDoctor = addDoctor;
