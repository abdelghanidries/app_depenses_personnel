"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{ /*import {Router} from "express";
import { register , login } from "../controllers/auth";
import { verifyToken }  from "../middleware/auth";




const router = Router();

//router.get("/metrics", getDashboardMetrics);// http://localhost:8000/dashboard/metrics
router.post("/register", register);
router.post("/auth/login", login); // Connexion// http://localhost:8000/dashboard/metrics
router.get("/compte", verifyToken);

export default router; */
}
const express_1 = require("express");
const depense_1 = require("../controllers/depense");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Routes d'authentification
router.post("/ajouter", depense_1.depense);
router.get("/getdepenses", auth_1.verifyToken, depense_1.getDepenses);
// Route protégée accessible uniquement avec un token valide
exports.default = router;
