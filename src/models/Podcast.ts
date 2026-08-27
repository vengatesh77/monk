import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPodcast extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  audioUrl?: string;
  guestName?: string;
  guestImage?: string;
  category: string;
  duration?: string;
  publishedAt?: Date;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PodcastSchema: Schema<IPodcast> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    videoUrl: { type: String, default: "" },
    audioUrl: { type: String, default: "" },
    guestName: { type: String, default: "" },
    guestImage: { type: String, default: "" },
    category: { type: String, default: "Podcast Production" },
    duration: { type: String, default: "30 min" },
    publishedAt: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Podcast: Model<IPodcast> =
  mongoose.models.Podcast || mongoose.model<IPodcast>("Podcast", PodcastSchema);

export default Podcast;
