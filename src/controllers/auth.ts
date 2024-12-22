import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email: email } });
  if (user) {
    throw new Error("User already exists");
  }
  user = await prismaClient.user.create({
    data: { name, email, password: hashSync(password, 10) },
  });

  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email: email } });
  if (!user) {
    throw new Error("User does not exist");
  }

  if (!compareSync(password, user.password)) {
    res.status(500);
    throw new Error("Invalid password");
  }

  let token = jwt.sign({ id: user.id }, JWT_SECRET);

  res.status(200).json({ user, token });
};
