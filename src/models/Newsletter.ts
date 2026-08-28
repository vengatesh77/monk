import mongoose, { Document, Schema } from "mongoose";

export interface INewsletter extends Document {
  name?: string;
  contactNumber?: string;
  email: string;
  createdAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    name: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
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
