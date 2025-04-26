import mongoose, { Schema, Document } from 'mongoose';

type OrderStatus = 'pending' | 'confirm' | 'cancel' | 'failed' | 'success' | 'return';
type PaymentStatus = 'paid' | 'unpaid';
type PaymentMethod = 'COD' | 'SSL';

interface Order extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  email?: string;
  mobileNumber: number | string;
  products: object[];
  subtotal: number;
  deliveryFee?: number;
  discount?: number;
  cupon?: number;
  address: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymetnMethod: PaymentMethod;
  reason?: string;
  comment?: string;
}

const orderSchema = new Schema<Order>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    mobileNumber: {
      type: Schema.Types.Mixed,
      required: true,
    },
    products: {
      type: [Object],
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    cupon: {
      type: Number,
    },
    address: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirm', 'cancel', 'failed', 'success', 'return'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },
    paymetnMethod: {
      type: String,
      enum: ['COD', 'SSL'],
      required: true,
    },
    reason: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export const orderModel = mongoose.model<Order>('orders', orderSchema);
