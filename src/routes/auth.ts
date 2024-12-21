import { Router } from "express";
import { login } from "../controllers/auth";

const authRoutes: Router = Router();

authRoutes.get("/", login);

export default authRoutes;