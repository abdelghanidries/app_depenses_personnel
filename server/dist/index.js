"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const multer_1 = __importDefault(require("multer")); // Import de multer
const path_1 = __importDefault(require("path"));
// Importation des routes
//import login from "./routes/login";
// Importation des routes
const login_1 = __importDefault(require("./routes/login")); // Correction du nom du fichier d'importation des routes
const depense_1 = __importDefault(require("./routes/depense"));
// Configuration de dotenv
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// Configuration de multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "uploads")); // Utiliser un chemin absolu
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// Définition des routes
//app.post("/register", upload.single("image"), login); // Utilisez upload.single() pour un seul fichier
//app.post("/auth/login", login);
//app.post("/compte", login);
app.use("/auth", login_1.default); // Utilisation du fichier de routes pour gérer les routes d'authentification
app.use("/depense", depense_1.default);
// Démarrage du serveur
const port = process.env.PORT || 3001; // Remplacez `port` par `PORT`
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
