// @ts-nocheck
import  dotenv  from 'dotenv';


import { Router } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary'; // Make sure to import this
import { Request, Response } from 'express';
import upload from '../middleware/multer';

const router: Router = Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dcirauywt',
  api_key:724993446295319,
  api_secret: 'Ksvl9KtctWIQhCSnYZ6-BNa7d70',
  
});

dotenv.config()



router.post('/upload', upload.single('image'), (req: Request, res: Response) => {
   console.log(req.body, 'ha vaidddd');
 cloudinary.uploader.upload(req.body.imgUrl,(err, result)=>{

    if(err){
        console.log(err);
    }
    console.log(result);
 })
});

export default router;
