import jwt from "jsonwebtoken";

const SEVEN_DAYS_MS = 1000 * 60 * 60 * 24 * 7;

export function signToken(userId) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
}

export function verifyToken(token) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.verify(token, secret);
}

export function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SEVEN_DAYS_MS,
  });
}

export function clearAuthCookie(res) {
  res.clearCookie("token");
}
