import mongoose, { Document, Schema } from "mongoose";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: Date;
  preferredTime: string;
  peopleCount: number;
  message?: string;
  status: BookingStatus;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      enum: [
        "Podcast Recording",
        "Podcast Video",
        "Video Production",
        "Photography",
        "Branding",
        "Other",
      ],
    },
    preferredDate: {
      type: Date,
      required: [true, "Preferred date is required"],
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"],
    },
    peopleCount: {
      type: Number,
      required: [true, "Number of people is required"],
      min: [1, "At least 1 person required"],
      max: [50, "Maximum 50 people allowed"],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Booking =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
