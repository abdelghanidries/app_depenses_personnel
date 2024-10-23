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

import { depense , getDepenses} from "../controllers/depense";
import { verifyToken } from "../middleware/auth";




const router = Router();

// Routes d'authentification

router.post("/ajouter", depense); 

router.get("/getdepenses", verifyToken, getDepenses);
  // Route protégée accessible uniquement avec un token valide
  
export default router;
