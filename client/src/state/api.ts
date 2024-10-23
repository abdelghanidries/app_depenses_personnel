import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Interface User
export interface User {
  
  nom: string;
  prenom: string;
  image: string;
  email: string;
  motPasse: string;
}
// Interface CompteData - vous pouvez l'ajuster selon les besoins réels
export interface CompteData {
  utilisateurId: string;
  nom: string;
  prenom: string;
  image: string;
  email: string;
}

// pour les depense

export interface Depense {
  utilisateurId: string;
  nom: string;
  montant: number;  // Changement de string à number
 categorie: string;
  date: string;
  note : string;
}
// Interface DashboardDepenses
export interface DashboardDepenses {
  Users: User[];
  CompteData : CompteData[];
  Depenses : Depense[];
}

// Définition de l'API
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardDepenses"],
  endpoints: (build) => ({
    // Endpoint pour soumettre les données d'authentification (login)
    submitAuthData: build.mutation<{ token: string }, { email: string; motPasse: string }>({
      query: (body) => ({
        url: "/auth/login", // Ajustez l'URL selon vos besoins
        method: "POST",
        body,
      }),
      invalidatesTags: ["DashboardDepenses"], // Si nécessaire, ajustez les tags
    }),

    // Endpoint pour l'inscription des utilisateurs
    registerUser: build.mutation<User, FormData>({
      query: (formData) => ({
        url: "auth/register", // Ajustez l'URL selon vos besoins
        method: "POST",
        body: formData, // Ici, le body est de type FormData
      }),
      invalidatesTags: ["DashboardDepenses"], // Si nécessaire, ajustez les tags
    }),

    // Endpoint pour récupérer les données du compte
    fetchCompteData: build.query<CompteData , void>({
      query: () => ({
        url: "auth/compte",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajouter le token ici
        },
      }),
    }),
     // Endpoint pour l'inscription des utilisateurs
     depenseAjouter: build.mutation<Depense, FormData>({
      query: (depense) => ({
        url: "depense/ajouter", // Ajustez l'URL selon vos besoins
        method: "POST",
         body: depense,  // Envoi direct en tant qu'objet JSON // Ici, le body est de type FormData
      }),
      invalidatesTags: ["DashboardDepenses"], // Si nécessaire, ajustez les tags
    }),

   /* fetchDepensesData: build.query<Depense , void>({
      query: () => ({
        url: "depense/getdepenses",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajouter le token ici
        },
      }),
    }), */
    fetchDepensesData: build.query<DashboardDepenses , void>(
      {
        query: () => "depense/getdepenses",
        providesTags: ["DashboardDepenses"]
      }
    )
  }),
 
});

// Export des hooks générés par RTK Query
export const {
  useSubmitAuthDataMutation,
  useRegisterUserMutation, // Hook pour l'inscription
  useFetchCompteDataQuery, // Hook pour récupérer les données du compte
  useDepenseAjouterMutation,// submit depense
  useFetchDepensesDataQuery,
} = api;
