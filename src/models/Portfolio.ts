import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPortfolio extends Document {
  title: string;
  slug: string;
  description: string;
  category: "podcast" | "video" | "photography" | "branding";
  thumbnail: string;
  images: string[];
  videoUrl?: string;
  clientName?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema: Schema<IPortfolio> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["podcast", "video", "photography", "branding"],
      required: true,
    },
    thumbnail: { type: String, required: true },
    images: { type: [String], default: [] },
    videoUrl: { type: String, default: "" },
    clientName: { type: String, default: "" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

export default Portfolio;
