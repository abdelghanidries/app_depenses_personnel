"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepenses = exports.depense = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/* REGISTER USER */
const depense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { utilisateurId, nom, montant, categorie, date, note } = req.body;
        if (!utilisateurId) {
            res.status(400).json({ msg: "Tous les champs utilisateurId" });
            return;
        }
        if (!nom) {
            res.status(400).json({ msg: "Tous les champs nom" });
            return;
        }
        if (!montant) {
            res.status(400).json({ msg: "Tous les champs montant" });
            return;
        }
        if (!categorie) {
            res.status(400).json({ msg: "Tous les champs categorie" });
            return;
        }
        if (!date) {
            res.status(400).json({ msg: "Tous les champs sont requis" });
            return;
        }
        if (!note) {
            res.status(400).json({ msg: "Tous les champs sont requis" });
            return;
        }
        // Création d'une depense
        const nouveauDepense = yield prisma.depenses.create({
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
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.depense = depense;
/* Récupération de toutes les dépenses d'un utilisateur */
const getDepenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const utilisateurId = req.user.id; // L'ID utilisateur vient du token décodé par le middleware verifyToken
        // Récupération de toutes les dépenses liées à un utilisateur
        const depenses = yield prisma.depenses.findMany({
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
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getDepenses = getDepenses;
