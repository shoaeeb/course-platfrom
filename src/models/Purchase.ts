import mongoose, { Schema, models } from 'mongoose';

const PurchaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  amount: { type: Number, required: true },
  paymentId: { type: String, required: true },
}, { timestamps: true });

const Purchase = models.Purchase || mongoose.model('Purchase', PurchaseSchema);

export default Purchase;
