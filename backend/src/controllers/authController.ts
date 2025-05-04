import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../data/prismaClient";
import * as JWT from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";

export async function register(req: Request, res: Response) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  let { email, password, name } = req.body;
  name = name.trim();
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { name }] },
  });
  if (existingUser) {
    const errors: Record<string, string>[] = [];
    if (existingUser.email === email)
      errors.push({ msg: "taken", path: "email" });
    if (existingUser.name === name) errors.push({ msg: "taken", path: "name" });
    res.status(400).json({ errors });
    return;
  }
  const user = await prisma.user.create({
    data: { email, name, password: hashSync(password, 10) },
  });
  const accessToken = createAccessToken(user);
  setRefreshToken(user, res);
  res.json({ accessToken });
}

export async function login(req: Request, res: Response) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user || !compareSync(password, user.password)) {
    res.status(403).json({ errors: { "Incorrect credentials": true } });
    return;
  }
  const accessToken = createAccessToken(user);
  setRefreshToken(user, res);
  res.json({ accessToken, name: user.name });
}

function createAccessToken(user: any) {
  const accessToken = JWT.sign(
    { id: user.id as number },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: 60 * 10 }
  );
  return accessToken;
}

function setRefreshToken(user: any, res: Response) {
  const expiresIn = 86400 * 7 * 2;
  const refreshToken = JWT.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn }
  );
  res.cookie("refreshToken", refreshToken, {
    maxAge: expiresIn,
    path: "/refresh",
    httpOnly: true,
  });
  return refreshToken;
}
