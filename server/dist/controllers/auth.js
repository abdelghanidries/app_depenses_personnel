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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompte = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/* REGISTER USER */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, prenom, email, motPasse, } = req.body;
        // Récupération de l'image avec Multer
        const image = req.file ? req.file.filename : null;
        // Vérifications des champs requis
        if (!nom || !prenom || !email || !motPasse) {
            res.status(400).json({ msg: "Tous les champs sont requis" });
            return;
        }
        // Vérifiez si l'utilisateur existe déjà
        const existUtilisateur = yield prisma.users.findUnique({
            where: { email }
        });
        if (existUtilisateur) {
            res.status(400).json({ msg: "L'utilisateur existe déjà." });
            return;
        }
        // Hachage du mot de passe
        const salt = yield bcrypt_1.default.genSalt();
        const passwordHash = yield bcrypt_1.default.hash(motPasse, salt);
        // Création de l'utilisateur
        const nouveauUtilisateur = yield prisma.users.create({
            data: {
                nom,
                prenom,
                image,
                email,
                motPasse: passwordHash,
            }
        });
        res.status(201).json(nouveauUtilisateur);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.register = register;
/* LOGIN IN */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, motPasse } = req.body;
        const utilisateur = yield prisma.users.findUnique({
            where: { email }
        });
        if (!utilisateur) {
            res.status(400).json({ msg: "L'utilisateur n'existe pas." });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(motPasse, utilisateur.motPasse);
        if (!isMatch) {
            res.status(400).json({ msg: "Identifiants invalides." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: utilisateur.utilisateurId }, process.env.JWT_SECRET);
        const { motPasse: _ } = utilisateur, utilisateurSansMotPasse = __rest(utilisateur, ["motPasse"]);
        res.status(200).json({ token, utilisateur: utilisateurSansMotPasse });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.login = login;
/* GET COMPTE (User Info) */
const getCompte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const utilisateurId = req.user.id; // L'ID utilisateur vient du token décodé par le middleware verifyToken
        const utilisateur = yield prisma.users.findUnique({
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
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getCompte = getCompte;
