"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
// Utilisation de multer pour l'upload d'image
const upload = (0, multer_1.default)({ dest: "uploads/" });
const router = (0, express_1.Router)();
// Routes d'authentification
router.post("/register", upload.single("image"), auth_1.register); // Utilisez upload.single() pour un seul fichier
router.post("/login", auth_1.login); // Connexion de l'utilisateur
router.get("/compte", auth_2.verifyToken, auth_1.getCompte);
//router.post("/depense", depense); 
// Route protégée accessible uniquement avec un token valide
exports.default = router;
