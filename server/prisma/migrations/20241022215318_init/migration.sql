-- CreateTable
CREATE TABLE "Depenses" (
    "depenseId" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "montant" DOUBLE PRECISION,
    "categorie" TEXT,
    "date" TIMESTAMP(3),
    "note" TEXT,

    CONSTRAINT "Depenses_pkey" PRIMARY KEY ("depenseId")
);

-- AddForeignKey
ALTER TABLE "Depenses" ADD CONSTRAINT "Depenses_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Users"("utilisateurId") ON DELETE RESTRICT ON UPDATE CASCADE;
