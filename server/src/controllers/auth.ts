import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

/* REGISTER USER */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      nom,
      prenom,
      email,
      motPasse,
    }: {
      nom: string;
      prenom: string;
      email: string;
      motPasse: string;
    } = req.body;

    // Récupération de l'image avec Multer
    const image = req.file ? req.file.filename : null;

    // Vérifications des champs requis
    if (!nom || !prenom || !email || !motPasse) {
      res.status(400).json({ msg: "Tous les champs sont requis" });
      return;
    }

    // Vérifiez si l'utilisateur existe déjà
    const existUtilisateur = await prisma.users.findUnique({
      where: { email }
    });
    
    if (existUtilisateur) {
      res.status(400).json({ msg: "L'utilisateur existe déjà." });
      return;
    }

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(motPasse, salt);

    // Création de l'utilisateur
    const nouveauUtilisateur = await prisma.users.create({
      data: {
        nom,
        prenom,
        image,
        email,
        motPasse: passwordHash,
      }
    });

    res.status(201).json(nouveauUtilisateur);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

/* LOGIN IN */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, motPasse }: { email: string; motPasse: string } = req.body;

    const utilisateur = await prisma.users.findUnique({
      where: { email }
    });

    if (!utilisateur) {
      res.status(400).json({ msg: "L'utilisateur n'existe pas." });
      return;
    }

    const isMatch = await bcrypt.compare(motPasse, utilisateur.motPasse);
    if (!isMatch) {
      res.status(400).json({ msg: "Identifiants invalides." });
      return;
    }

    const token = jwt.sign({ id: utilisateur.utilisateurId }, process.env.JWT_SECRET as string);
    const { motPasse: _, ...utilisateurSansMotPasse } = utilisateur;

    res.status(200).json({ token, utilisateur: utilisateurSansMotPasse });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }

 
};

 /* GET COMPTE (User Info) */
 export const getCompte = async (req: Request, res: Response): Promise<void> => {
  try {
    const utilisateurId = (req as any).user.id; // L'ID utilisateur vient du token décodé par le middleware verifyToken

    const utilisateur = await prisma.users.findUnique({
      where: { utilisateurId },
      select: {
        utilisateurId: true,
        nom: true,
        prenom: true,
        image: true,
        email: true,
       
      }
    });

    if (!utilisateur) {
      res.status(404).json({ msg: "Utilisateur non trouvé." });
      return;
    }

    res.status(200).json(utilisateur);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }

};