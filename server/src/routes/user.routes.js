
import { Router } from "express";
import {  userRegistration,userLogin} from "../controllers/user.controller.js";
const router = Router();

router.route("/register").post(userRegistration);
router.route("/login").post(userLogin)
export default router