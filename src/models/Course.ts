import mongoose, { Schema, models } from 'mongoose';

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  category: { type: String, required: true },
  duration: { type: String },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  enrolledCount: { type: Number, default: 0 },
}, { timestamps: true });

const Course = models.Course || mongoose.model('Course', CourseSchema);

export default Course;
