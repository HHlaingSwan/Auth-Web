"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => {
  const SingOutHandler = () => {
    signOut();
  };
  return (
    <div>
      <Button onClick={SingOutHandler}>Sign Out </Button>
    </div>
  );
};

export default SignOut;
