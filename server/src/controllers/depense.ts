
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

/* REGISTER USER */
export const depense = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      utilisateurId,
      nom,
      montant,
      categorie,
      date,
      note
    }: {
      utilisateurId : string,
      nom: string;
      montant: number;
      categorie: string;
      date: string;
      note : string
    } = req.body;

    
    if (!utilisateurId ) {
      res.status(400).json({ msg: "Tous les champs utilisateurId" });
      return;
    }
    if (!nom ) {
      res.status(400).json({ msg: "Tous les champs nom" });
      return;
    }
    if (!montant) {
      res.status(400).json({ msg: "Tous les champs montant" });
      return;
    }
    if ( !categorie) {
      res.status(400).json({ msg: "Tous les champs categorie" });
      return;
    }
    if (!date ) {
      res.status(400).json({ msg: "Tous les champs sont requis" });
      return;
    }
    if (!note) {
      res.status(400).json({ msg: "Tous les champs sont requis" });
      return;
    }
    

    // Création d'une depense
    const nouveauDepense = await prisma.depenses.create({
      data: {
        utilisateurId,
        nom,
        montant,
        categorie,
        date: new Date(date), // Convertir la chaîne en Date
        note
      }
    });

    res.status(201).json(nouveauDepense);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};


/* Récupération de toutes les dépenses d'un utilisateur */
export const getDepenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const utilisateurId = (req as any).user.id; // L'ID utilisateur vient du token décodé par le middleware verifyToken

    // Récupération de toutes les dépenses liées à un utilisateur
    const depenses = await prisma.depenses.findMany({
      where: { utilisateurId },
      select: {
        depenseId: true,
        utilisateurId: true,
        nom: true,
        montant: true,
        categorie: true,
        date: true,
        note: true
      }
    });

    if (!depenses || depenses.length === 0) {
      res.status(404).json({ msg: "Aucune dépense trouvée pour cet utilisateur." });
      return;
    }

    res.status(200).json(depenses);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};