// app/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { HomeScreen } from '@/app/ui/Home';

export default function Page() {
  const { data: session, status } = useSession();

  return <HomeScreen session={session} status={status} />;
}
