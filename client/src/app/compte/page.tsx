"use client"

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useFetchCompteDataQuery } from "@/state/api"; // Ajustez le chemin vers votre fichier API
import { resetUser } from "@/state/globalSlice"; // Importez l'action pour réinitialiser l'utilisateur
import FormDepense  from "./FormDepense"

// Ajustez le type de la réponse selon les données réelles
interface CompteData {
  utilisateurId :string;
  nom: string;
  prenom: string;
  image: string;
  email: string;
  
  // Ajoutez d'autres propriétés ici si nécessaire
}

const Compte = () => {
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
    <h1>Données du compte</h1>
    {data ? (
      <div>
        <p><strong>utilisateurId:</strong> {data.utilisateurId}</p>
        <p><strong>Nom :</strong> {data.nom}</p>
        <p><strong>Prénom :</strong> {data.prenom}</p>
        <p><strong>Email :</strong> {data.email}</p>
        {/* Ajoutez d'autres informations que vous souhaitez afficher */}
        <button onClick={handleLogout}  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Se déconnecter</button> {/* Bouton de déconnexion */}
        <FormDepense  utilisateurId={data.utilisateurId}  />
        

      </div>
    ) : (
      <div>Aucune donnée disponible.</div>
    )}
  </div>
  );
};

export default Compte;
