import express from "express";
import {getBook} from '../controller/booking.controller.js'

const router = express.Router();

router.get("/date/:date",getBook);

export default router;