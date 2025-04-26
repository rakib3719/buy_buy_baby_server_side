import mongoose, { Schema, Document } from "mongoose";

interface Cart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  email?: string;
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

const cartSchema = new Schema<Cart>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export const cartModel = mongoose.model<Cart>('cart', cartSchema);
