import express from "express";
import { createMember, getMember } from "../controller/member.controller.js";

const router = express.Router();

router.get("/",getMember);
router.post("/create",createMember);
export default router;
