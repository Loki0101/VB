"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors group"
    >
      <LogOut className="w-5 h-5 text-zinc-500 group-hover:text-red-400" />
      <span className="font-medium">Sign Out</span>
    </button>
  );
}
