import Crypto from "../models/Crypto.js";

function toPayload(cryptoDoc) {
  return {
    id: cryptoDoc._id,
    name: cryptoDoc.name,
    symbol: cryptoDoc.symbol,
    price: cryptoDoc.price,
    image: cryptoDoc.image,
    change24h: cryptoDoc.change24h,
    marketCap: cryptoDoc.marketCap,
    volume24h: cryptoDoc.volume24h,
    sparkline: cryptoDoc.sparkline,
    listedAt: cryptoDoc.listedAt,
    createdAt: cryptoDoc.createdAt,
    updatedAt: cryptoDoc.updatedAt,
  };
}

export async function getAllCrypto(req, res) {
  const items = await Crypto.find().sort({ marketCap: -1, createdAt: -1 });
  res.status(200).json({ data: items.map(toPayload) });
}

export async function getTopGainers(req, res) {
  const items = await Crypto.find().sort({ change24h: -1, createdAt: -1 });
  res.status(200).json({ data: items.map(toPayload) });
}

export async function getNewListings(req, res) {
  const items = await Crypto.find().sort({ listedAt: -1, createdAt: -1 });
  res.status(200).json({ data: items.map(toPayload) });
}

export async function createCrypto(req, res) {
  const { name, symbol, price, image, change24h, marketCap, volume24h, sparkline } = req.body ?? {};

  if (!name || !symbol || price === undefined || change24h === undefined) {
    return res.status(400).json({
      message: "name, symbol, price and change24h are required",
    });
  }

  const parsedPrice = Number(price);
  const parsedChange = Number(change24h);
  const parsedMarketCap = marketCap !== undefined ? Number(marketCap) : 0;
  const parsedVolume24h = volume24h !== undefined ? Number(volume24h) : 0;

  if (
    Number.isNaN(parsedPrice) ||
    Number.isNaN(parsedChange) ||
    Number.isNaN(parsedMarketCap) ||
    Number.isNaN(parsedVolume24h)
  ) {
    return res.status(400).json({ message: "Numeric fields must be valid numbers" });
  }

  const created = await Crypto.create({
    name: name.trim(),
    symbol: symbol.trim().toUpperCase(),
    price: parsedPrice,
    image: typeof image === "string" ? image.trim() : "",
    change24h: parsedChange,
    marketCap: parsedMarketCap,
    volume24h: parsedVolume24h,
    sparkline: Array.isArray(sparkline)
      ? sparkline.filter((point) => !Number.isNaN(Number(point))).map(Number)
      : [],
  });

  return res.status(201).json({
    message: "Cryptocurrency created successfully",
    data: toPayload(created),
  });
}
