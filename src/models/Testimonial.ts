import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  location: string;
  role?: string;
  image?: string;
  message: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema<ITestimonial> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    role: { type: String, default: "Client" },
    image: { type: String, default: "" },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
  },
  { timestamps: true }
);

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
