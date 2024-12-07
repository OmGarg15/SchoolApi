import {Router} from 'express';
import { createSchool, getSchools} from '../Controller/UserController.js';
import prisma from "../DB/db.config.js";

const router = Router();

//Inserting Data
router.post("/addSchool",createSchool);

router.get('/listSchools', getSchools);

export default router;