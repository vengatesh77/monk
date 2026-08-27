import mongoose, { Document, Schema } from "mongoose";

export interface INewsletter extends Document {
  email: string;
  createdAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Newsletter =
  mongoose.models.Newsletter ||
  mongoose.model<INewsletter>("Newsletter", NewsletterSchema);

export default Newsletter;
