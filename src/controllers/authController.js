import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { clearAuthCookie, setAuthCookie, signToken } from "../utils/jwt.js";

function sanitizeUser(userDoc) {
  return {
    id: userDoc._id,
    name: userDoc.name,
    email: userDoc.email,
    createdAt: userDoc.createdAt,
  };
}

export async function register(req, res) {
  const { name, email, password } = req.body ?? {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email and password are required" });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

  if (existingUser) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: passwordHash,
  });

  const token = signToken(createdUser._id.toString());
  setAuthCookie(res, token);

  return res.status(201).json({
    message: "Registration successful",
    token,
    user: sanitizeUser(createdUser),
  });
}

export async function login(req, res) {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken(user._id.toString());
  setAuthCookie(res, token);

  return res.status(200).json({
    message: "Login successful",
    token,
    user: sanitizeUser(user),
  });
}

export function loginInfo(req, res) {
  return res.status(200).json({
    message: "Send a POST request to this endpoint with email and password",
  });
}

export function registerInfo(req, res) {
  return res.status(200).json({
    message: "Send a POST request to this endpoint with name, email and password",
  });
}

export function logout(req, res) {
  clearAuthCookie(res);
  return res.status(200).json({ message: "Logged out successfully" });
}
