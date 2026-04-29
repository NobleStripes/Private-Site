"use client";
import { signIn, signOut } from "next-auth/react";

export default function AuthButton({ session }: { session: any }) {
  if (session) {
    return <button className="btn btn-glass" onClick={() => signOut()}>Sign Out</button>;
  }
  return <button className="btn btn-glass" onClick={() => signIn()}>Sign In</button>;
}
