"use client";
import useMember from "@/hooks/useMember";
import React from "react";

const CreatePage = () => {
  const { data } = useMember();
  return <div>CreatePage</div>;
};

export default CreatePage;
