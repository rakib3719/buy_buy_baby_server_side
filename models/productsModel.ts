import mongoose, { Document, Schema } from "mongoose";

interface Products extends Document{


    productName: string;
  slug: string;
  category: string;
  brand?: string;
  price: number;
  mainPrice: number;
  discount: number;
  stock: number;
  description: string;
  image: string;
  gallery?: string[];
  ageGroup?: string;
  weightLimit?: string;
  color?: string;
  size?: string;
  material?: string;
  ingredients?: string[]; // for food items only
  isFeatured?: boolean;
  isNewArrival?: boolean;
  rating?: number;
  reviewsCount?: number;
  status: 'active' | 'inactive' | 'out-of-stock';
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<Products>(
    {
      productName: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      category: { type: String, required: true },
      brand: { type: String },
      price: { type: Number, required: true },
      mainPrice: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      stock: { type: Number, default: 0 },
      description: { type: String, required: true },
      image: { type: String, required: true },
      gallery: [{ type: String }],
      ageGroup: { type: String },
      weightLimit: { type: String },
      color: { type: String },
      size: { type: String },
      material: { type: String },
      ingredients: [{ type: String }],
      isFeatured: { type: Boolean, default: false },
      isNewArrival: { type: Boolean, default: false },
      rating: { type: Number, default: 0 },
      reviewsCount: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ["active", "inactive", "out-of-stock"],
        default: "active",
      },
    },
    { timestamps: true }
  );

  export const productsModel = mongoose.model<Products>('products', productSchema)
  