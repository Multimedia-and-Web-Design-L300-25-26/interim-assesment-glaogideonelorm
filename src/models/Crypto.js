import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    change24h: {
      type: Number,
      required: true,
    },
    listedAt: {
      type: Date,
      default: Date.now,
    },
    marketCap: {
      type: Number,
      default: 0,
      min: 0,
    },
    volume24h: {
      type: Number,
      default: 0,
      min: 0,
    },
    sparkline: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Crypto", cryptoSchema);
