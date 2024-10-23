{/*import {Router} from "express";
import { register , login } from "../controllers/auth";
import { verifyToken }  from "../middleware/auth";




const router = Router();

//router.get("/metrics", getDashboardMetrics);// http://localhost:8000/dashboard/metrics
router.post("/register", register);
router.post("/auth/login", login); // Connexion// http://localhost:8000/dashboard/metrics
router.get("/compte", verifyToken);

export default router; */}

import { Router } from "express";
import { register, login ,getCompte } from "../controllers/auth";
import { depense } from "../controllers/depense";
import { verifyToken } from "../middleware/auth";
import multer from "multer";

// Utilisation de multer pour l'upload d'image
const upload = multer({ dest: "uploads/" });

const router = Router();

// Routes d'authentification
router.post("/register", upload.single("image"), register); // Utilisez upload.single() pour un seul fichier
router.post("/login", login); // Connexion de l'utilisateur
router.get("/compte", verifyToken, getCompte);
//router.post("/depense", depense); 
  // Route protégée accessible uniquement avec un token valide
  
export default router;
