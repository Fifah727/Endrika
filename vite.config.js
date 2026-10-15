import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" : les chemins des fichiers sont relatifs, le site fonctionne donc
// sous n'importe quelle adresse (https://pseudo.github.io/nom-du-depot/ ou domaine perso)
// sans rien configurer. L'état de l'avatar vit dans le #hash : aucun routeur, aucun 404.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
