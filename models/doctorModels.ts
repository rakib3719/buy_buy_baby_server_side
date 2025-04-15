import mongoose, { Document, Schema } from "mongoose";


type Gender = 'male' | 'female' | 'others'
type Status = 'active' | 'inactive' | 'suspend'
type Specialist =  
  | "General Pediatrics"  
  | "Neonatology"  
  | "Pediatric Cardiology"  
  | "Pediatric Neurology"  
  | "Pediatric Endocrinology"  
  | "Pediatric Gastroenterology"  
  | "Pediatric Hematology-Oncology"  
  | "Pediatric Nephrology"  
  | "Pediatric Surgery"  
  | "Pediatric Orthopedics"  
  | "Pediatric Psychiatry"  
  | "Developmental & Behavioral Pediatrics";  

  type Qualification =  
  | "MBBS"  
  | "DCH (Diploma in Child Health)"  
  | "FCPS (Pediatrics)"  
  | "MD (Pediatrics)"  
  | "MS (Pediatric Surgery)"  
  | "MRCPCH (UK)"  
  | "DNB (Pediatrics)"  
  | "DM (Neonatology)"  
  | "DM (Pediatric Neurology)"  
  | "DM (Pediatric Cardiology)"  
  | "Fellowship in Pediatric Critical Care"  
  | "Fellowship in Pediatric Hematology-Oncology";  


interface Doctor extends Document{
name:string,
email:string,
imgUrl:string,
password:string,
phoneNumber:string,
bikashNumber:string,
nidNumber:string,
medicalLiecense:string,
gender:Gender,
status: Status,
linkdin?:string,
facebook?:string,
specialization:Specialist,
qualifications:Qualification,
chamberAddress:string,
dateOfBirth:Date,
details?:string,
qoute?:string,


}
const DoctorSchema = new Schema<Doctor>({
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
  
  export const doctorModel = mongoose.model<Doctor>('doctor', DoctorSchema)