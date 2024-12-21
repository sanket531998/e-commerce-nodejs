import { Router } from "express";
import { signUp } from "../controllers/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", signUp);

export default authRoutes;
