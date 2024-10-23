import { useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { FormikHelpers } from "formik";
import { useDepenseAjouterMutation } from "@/state/api";

// Define interfaces for form values
interface DepenseValues {
  nom: string;
  montant: number;
  categorie: string;
  date: string;
  note: string;
}

interface FormDepenseProps {
  utilisateurId: string; // Ajouter la prop utilisateurId
}

// Validation schema for depense
const depenseSchema = yup.object().shape({
  nom: yup.string().required("Dépense name is required"),
  montant: yup.number().required("Montant is required").min(0, "Montant cannot be negative"),
  categorie: yup.string().required("Categorie is required"),
  date: yup.date().required("Date is required"),
  note: yup.string().optional(),
});

// Initial values for depense
const initialValuesdepense: DepenseValues = {
  nom: "",
  montant: 0,
  categorie: "",
  date: "",
  note: "",
};

const FormDepense = ({ utilisateurId }: FormDepenseProps) => {
  const [depenseAjouter] = useDepenseAjouterMutation();
  const router = useRouter();

  // Fonction pour ajouter une dépense
  const depense = async (
    values: DepenseValues,
    onSubmitProps: FormikHelpers<DepenseValues>
  ) => {
    const data = {
      utilisateurId, // Ajouter utilisateurId dans les données envoyées
      ...values, // Envoyer les autres champs du formulaire
    };

    try {
      const savedDepense = await depenseAjouter(data).unwrap();
      onSubmitProps.resetForm(); // Réinitialiser le formulaire après soumission
      if (savedDepense) {
        router.push("/depense"); // Redirection après l'ajout
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la dépense: ", error);
    }
  };

  // Gestion de la soumission du formulaire
  const handleFormSubmit = async (
    values: DepenseValues,
    onSubmitProps: FormikHelpers<DepenseValues>
  ) => {
    await depense(values, onSubmitProps);
  };

  return (
    <Formik
      initialValues={initialValuesdepense}
      validationSchema={depenseSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit }) => (
        <FormikForm onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
            <div className="w-full md:w-1/2">
              <label htmlFor="nom" className="block mb-2">
                Nom de la dépense
              </label>
              <Field
                name="nom"
                className="border p-2 rounded w-full"
                placeholder="Entrez le nom de la dépense"
              />
              <ErrorMessage
                name="nom"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="w-full md:w-1/2">
              <label htmlFor="montant" className="block mb-2">
                Montant
              </label>
              <Field
                name="montant"
                type="number"
                className="border p-2 rounded w-full"
                placeholder="Entrez le montant"
              />
              <ErrorMessage
                name="montant"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
            <div className="w-full md:w-1/2">
              <label htmlFor="categorie" className="block mb-2">
                Catégorie
              </label>
              <Field
                name="categorie"
                className="border p-2 rounded w-full"
                placeholder="Entrez la catégorie"
              />
              <ErrorMessage
                name="categorie"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="w-full md:w-1/2">
              <label htmlFor="date" className="block mb-2">
                Date
              </label>
              <Field
                name="date"
                type="datetime-local"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="note" className="block mb-2">
              Note
            </label>
            <Field
              name="note"
              className="border p-2 rounded w-full"
              placeholder="Ajoutez une note (facultatif)"
            />
            <ErrorMessage
              name="note"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Ajouter la dépense
          </button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default FormDepense;
