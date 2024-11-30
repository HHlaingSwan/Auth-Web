"use client";
import React from "react";
import DataTable from "./_components/DataTable";
import CreateMember from "./_components/CreateMember";

const MemberList = () => {
  return (
    <div className="space-y-5 mt-5">
      {/* form */}
      <CreateMember />
      
   
      <DataTable />
    </div>
  );
};

export default MemberList;
