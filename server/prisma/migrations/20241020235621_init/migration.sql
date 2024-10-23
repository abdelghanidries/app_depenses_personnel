-- CreateTable
CREATE TABLE "Users" (
    "utilisateurId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motPasse" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("utilisateurId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
