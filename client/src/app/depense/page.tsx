"use client"

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useFetchCompteDataQuery } from "@/state/api"; // Ajustez le chemin vers votre fichier API
import { resetUser } from "@/state/globalSlice"; // Importez l'action pour réinitialiser l'utilisateur
import CardDepenses from "./CardDepenses"

interface CompteData {
  utilisateurId :string;
  nom: string;
  prenom: string;
  image: string;
  email: string;
  
  // Ajoutez d'autres propriétés ici si nécessaire
}

const Depense = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token"); // Vérifiez si le token existe

  // Affichez le token dans la console
  useEffect(() => {
    console.log("Token :", token);
  }, [token]);

  // Si le token n'existe pas, redirigez l'utilisateur
  useEffect(() => {
    if (!token) {
      router.push("/dashboard"); // Redirigez vers la page de connexion
    }
  }, [token, router]);
 
  const { data, error, isLoading } = useFetchCompteDataQuery();

  useEffect(() => {
    if (error) {
      console.error("Erreur :", error);
      router.push("/dashboard"); // Redirigez vers la page de connexion si une erreur se produit
    }
  }, [error, router]);

  

  if (isLoading) {
    return <div>Chargement...</div>; // Affichez un loader pendant le chargement
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token d'authentification
    dispatch(resetUser()); // Réinitialisez l'état de l'utilisateur dans Redux
    router.push("/dashboard"); // Redirigez vers la page de connexion ou d'accueil
  };
  return (
    <div>
      <div>
        
        <button onClick={handleLogout}  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Se déconnecter</button> {/* Bouton de déconnexion */}
        
        

      </div>
    <h1>Liste de dépense</h1>
    <div
    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardDepenses />
    </div>
  </div>
  );
};

export default Depense;
