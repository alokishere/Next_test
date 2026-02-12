"use client";

import { signOut } from "next-auth/react";

export function SignOut() {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div
      className="text-white hover:text-white cursor-pointer"
      onClick={handleSignOut}
    >
      Sign Out
    </div>
  );
}
