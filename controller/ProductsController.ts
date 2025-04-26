import { Request, Response } from "express";
import { productsModel } from "../models/productsModel";







export const getProducts = async (req: Request, res: Response) => {
    try {
      const { search, minPrice, maxPrice, category, sort, brand } = req.query;
      let filter: any = {};
  
      if (search) {
        filter.productName = { $regex: search, $options: "i" };
      }
  
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }
  
      if (category) {
        filter.category = category;
      }
  
      if (brand) {
        filter.brand = brand;
      }
  
      let sortOption: any = {};
      if (sort === "highToLow") {
        sortOption.price = -1;
      } else if (sort === "lowToHigh") {
        sortOption.price = 1;
      } else {
        sortOption.createdAt = -1; // default sort
      }
  
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
  
      const data = await productsModel.find(filter).sort(sortOption).skip(skip).limit(limit);
  
      res.status(200).json({
        message: "Products fetched successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error: error,
      });
    }
  };
  








export const addProducts = async(req:Request, res:Response)=>{


   try {
    const products = req.body;
    const newProducts =new productsModel(products);
    const saveProducts =await newProducts.save()
    res.status(201).json({
        message:'Sucessfullly added',
        data:saveProducts
    })
    
   } catch (error) {
    res.status(401).json({
        message:'somtething went wrong',
        error:error
    })
   }


}

export const deleteProducts = async(req:Request, res:Response)=>{
    const id = req.params.id;
    console.log(id, 'id to asca');

try {
  
    const deletedProducts =await productsModel.deleteOne({_id:id});
    res.status(201).json({
        message:'deleted successfully',
        data:deletedProducts
    })


    
} catch (error) {
    res.status(401).json({
        message:"Someting went worng!",
        error:error
    })
}

}

export const updateProducts = async(req:Request, res:Response)=>{


    try {
        
        const id = req.params.id;
        const productsData = req.body;
        const update = await productsModel.findByIdAndUpdate(id, productsData,{
            new:true,
            runValidators:true
        })

        if(update){
            res.status(201).json({
                message:'sucessfully update',
                data:update
            })
        }
        
        
    } catch (error) {
        res.status(401).json({
            message:'something went worng!',
            error:error
        })
    }

}



export const getProductById = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id;
        const data = await productsModel.findOne({_id: id});
        res.status(201).json({
            message:'Product find sucessfully',
            data:data
        })
        
    } catch (error) {
        res.status(401).json({
            message:'something went wrong',
            error:error
        })
    }
}