"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const DoctorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imgUrl: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    bikashNumber: { type: String, required: true },
    nidNumber: { type: String, required: true, unique: true },
    medicalLiecense: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female", "others"], required: true },
    status: { type: String, enum: ["active", "inactive", "suspend"], default: "active" },
    linkdin: { type: String },
    facebook: { type: String },
    specialization: {
        type: String,
        enum: [
            "General Pediatrics", "Neonatology", "Pediatric Cardiology", "Pediatric Neurology",
            "Pediatric Endocrinology", "Pediatric Gastroenterology", "Pediatric Hematology-Oncology",
            "Pediatric Nephrology", "Pediatric Surgery", "Pediatric Orthopedics",
            "Pediatric Psychiatry", "Developmental & Behavioral Pediatrics"
        ],
        required: true
    },
    qualifications: {
        type: String,
        enum: [
            "MBBS", "DCH (Diploma in Child Health)", "FCPS (Pediatrics)", "MD (Pediatrics)",
            "MS (Pediatric Surgery)", "MRCPCH (UK)", "DNB (Pediatrics)", "DM (Neonatology)",
            "DM (Pediatric Neurology)", "DM (Pediatric Cardiology)", "Fellowship in Pediatric Critical Care",
            "Fellowship in Pediatric Hematology-Oncology"
        ],
        required: true
    },
    chamberAddress: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    details: { type: String },
    qoute: { type: String }
}, { timestamps: true });
exports.doctorModel = mongoose_1.default.model('doctor', DoctorSchema);
