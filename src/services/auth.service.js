import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Admin = db.Admin;

export const createAdmin = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return Admin.create({ username, password: hashedPassword });
};

export const loginAdmin = async (username, password) => {
  const admin = await Admin.findOne({ where: { username } });
  if (!admin) {
    throw new Error("Invalid username or password");
  }

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET || "supersecretkey",
    { expiresIn: "1d" } 
  );

  return { token, admin: { id: admin.id, username: admin.username } };
};
