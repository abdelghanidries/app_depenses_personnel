import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer"; // Import de multer
import path from "path";
// Importation des routes
//import login from "./routes/login";


// Importation des routes
import authRoutes from "./routes/login"; // Correction du nom du fichier d'importation des routes
import depenseRoutes from "./routes/depense";

// Configuration de dotenv
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Utiliser un chemin absolu
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Définition des routes
//app.post("/register", upload.single("image"), login); // Utilisez upload.single() pour un seul fichier
//app.post("/auth/login", login);
//app.post("/compte", login);

app.use("/auth", authRoutes); // Utilisation du fichier de routes pour gérer les routes d'authentification
app.use("/depense", depenseRoutes );

// Démarrage du serveur
const port = process.env.PORT || 3001; // Remplacez `port` par `PORT`
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
