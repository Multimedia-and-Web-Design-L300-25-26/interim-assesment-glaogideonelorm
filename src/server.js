import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import Crypto from "./models/Crypto.js";
import { seedCryptos } from "./data/seedCrypto.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

async function ensureSeedData() {
  const count = await Crypto.countDocuments();

  if (count === 0) {
    await Crypto.insertMany(seedCryptos);
    console.log("Seeded initial crypto market data");
  }
}

async function startServer() {
  await connectDatabase();
  await ensureSeedData();

  app.listen(PORT, () => {
    console.log(`Backend server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start backend server", error);
  process.exit(1);
});
