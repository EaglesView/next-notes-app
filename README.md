# NextNotes
Nextnotes est une webapplication utilisant Next.js, Prisma et autres afin de créer une pratique. Le présent README contient toutes les informations pour comprendre le projet

# Tutoriels & Liens
[Tutoriel Prisma avec Base de données Postgresql](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql)

[Tutoriel Full-Stack Prisma,Nextjs et NextAuth](https://vercel.com/guides/nextjs-prisma-postgres)

Pour le reste, ce sera documenté dans le README pour aider a comprendre.

# Structure du projet
## /app
Dossier contenant pas mal tout l'application que le client va recevoir. mis a part la section api, la plupart de app sert a créer l'interface de base et afficher les composantes qui sont dans /components

étant donné que */app* est la racine de l'application, elle doit également contenir deux fichiers : _**page.tsx**_ et _**layout.tsx**_. Ces deux fichiers sont similaires: le layout montre ce qui sera déja préchargé lors de l'ouverture de l'appli (le layout de base, un peu comme quand spotify load et aucun album est encore la), et page.tsx est le contenu actif de la page en général.

## /app/api
Dossier contenant les [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) qui vont servir a créer un API (Pour l'authentification, les fonctions spéciales de la webapp en lien avec la base de données, etc.)

## /app/ui
Dossier contenant les petits components ui n'ayant pas besoin de fetch des informations sur la base de données. La raison pourquoi est que certaines fonctions de prise de données ne peuvent être éxécutés dans le dossier _**/app**_. Des exemples de ces petits components seraient: 
- Une barre de navigation, ou un footer.
- Des éléments statiques (sections, articles)
## /components
Dossier contenant les components de l'application ayant besoin de fetch des informations dans la base de données. Comme par exemple, un component montrant la photo de profil et le nom de l'utilisateur, qui seront tout deux en paramètres de fonction.

# Compréhension de Next.js

Pour bien comprendre comment Nextjs fonctionne, je vous invite a commencer par regarder les pages _**layout.tsx**_ et _**page.tsx**_ qui sont dans la racine de */app*.

```jsx
// /app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Notes",
  description: "A note taking app made in Next.js using Typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`&{inter.className} bg-slate-100 text-slate-800`}>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

```
```jsx
// app/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { HomeScreen } from '@/app/ui/Home';

export default function Page() {
  const { data: session, status } = useSession();

  return <HomeScreen session={session} status={status} />;
}

```

## Fichiers layout
Les fichiers layout servent littéralement a créer le layout de base dans l'application. Si par exemple, la barre de navigation sera par défaut dans toute les pages, vous pouvez l'ajouter à */app/layout.tsx*. Dans le cas du présent document, ce layout exporte seulement le **SessionProviderWrapper**, qui sert a déterminer si l'utilisateur est connecté a une session ou non (pas important pour la compréhension a ce point-ci, nous aurions aussi pu mettre nimporte quelle autre balise jsx/html)

## Fichier page
Les fichiers pages contiennent toute le HTML de ta page, écrit en [JSX](https://www.geeksforgeeks.org/how-does-jsx-differ-from-html/). Dans le cas du présent document, une balise **HomeScreen** qui est en fait un component créé et disponible dans */app/ui/home*.

### Note sur JSX
- En JSX comparé a HTML, le terme `class` est déja utilisé dans le language alors ils utilisent className=`` a la place de class pour ajouter du css.
- Ce projet utilise [Tailwind CSS](https://tailwindcss.com/) pour faciliter le css, alors si vous comprenez rien dans les "className" c'est chill

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
