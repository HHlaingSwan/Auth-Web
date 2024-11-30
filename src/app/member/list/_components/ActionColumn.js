import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { api } from "@/utils/axiosConfig";
import DeleteDialogBox from "@/components/reusable-components/DeleteDialogBox";
import EditMember from "./EditMember";

const ActionColumn = ({ member }) => {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditSheet, setIsOpenEditSheet] = useState(false);
  const { data: authData } = useSession();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: ["delete-member", member._id],
    mutationFn: async (member_id) => {
      const { data } = await api.delete(`/customer/${member_id}`, {
        headers: { Authorization: `Bearer ${authData.user.token}` },
      });
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        //
        toast.dismiss();
        toast.success(
          `Successfully Deleted ${data.deletedCustomer.customer_name}!`
        );
        queryClient.invalidateQueries({ queryKey: ["member-list"] });
        setIsOpenDeleteDialog(false);
      }
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`);
      console.log(error.message);
    },
  });
  const deleteHandler = () => {
    toast.loading("Delete Processing");
    deleteMutation.mutateAsync(member._id);
    ///
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsOpenDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpenEditSheet(true)}>
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialogBox
        open={isOpenDeleteDialog}
        onOpenChange={setIsOpenDeleteDialog}
        deleteHandler={deleteHandler}
        deleteMutation={deleteMutation}
        deleteText={member.customer_name}
      />
      <EditMember open={isOpenEditSheet} onOpenChange={setIsOpenEditSheet} member={member}/>
    </div>
  );
};

export default ActionColumn;
