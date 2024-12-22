import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { ErrorCodes, HttpExceptions } from "../execptions/root";
import { UnprocessableEntityException } from "../execptions/validation";
import { SignUpSchema } from "../schema/users";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    SignUpSchema.parse(req.body);
    const { name, email, password } = req.body;
    let user = await prismaClient.user.findFirst({ where: { email: email } });
    if (user) {
      next(
        new HttpExceptions(
          "User already exists",
          ErrorCodes.USER_ALREADY_EXISTS,
          409,
          null
        )
      );
    }
    user = await prismaClient.user.create({
      data: { name, email, password: hashSync(password, 10) },
    });

    res.status(201).json(user);
  } catch (error: any) {
    next(
      new UnprocessableEntityException(
        error?.issues,
        "Unprocessable Entity",
        ErrorCodes.UNPROCESSABLE_ENTITY
      )
    );
  }
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
