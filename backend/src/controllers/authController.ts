import { Request, Response } from "express";
import { validationResult } from "express-validator";
import client from "../data/prismaClient";

export async function register(req: Request, res: Response) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  let { email, password, name } = req.body;
  name = name.trim();
  const existingUser = await client.user.findFirst({
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
  await client.user.create({ data: { email, name, password } });
  res.json({ a: "b" });
}
