import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { api } from "@/utils/axiosConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const EditMemberSchema = z.object({
  customer_name: z.string().nonempty({ message: "Member Name is required!" }),
  vip_code: z.string().nonempty({ message: "Vip Code is required!" }),
  phone: z.string().nonempty({ message: "Phone is required!" }),
});

const EditMember = ({ open, onOpenChange, member }) => {
  const { data: authData } = useSession();
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationKey: ["create-member"],
    mutationFn: async (member_data) => {
      const { data } = await api.patch(`/customer/${member._id}`, member_data, {
        headers: { Authorization: `Bearer ${authData.user.token}` },
      });
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        //
        toast.dismiss();
        toast.success(
          `Successfully Updated ${data.updatedCustomer.customer_name}!`
        );
        console.log("successfully Updated!");
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["member-list"] });
        onOpenChange(false);
      }
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`);
      console.log(error.message);
    },
  });
  const form = useForm({
    resolver: zodResolver(EditMemberSchema),
    defaultValues: {
      customer_name: member.customer_name,
      vip_code: member.vip_code,
      phone: member.phone,
    },
    disabled: updateMutation.isPending,
  });

  const onSubmit = (values) => {
    console.log(values);
    toast.loading("Update Processing!");
    updateMutation.mutateAsync(values);
  };
  const handlerOpenChange = (open) => {
    if (!open) {
      form.reset();
    }

    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={handlerOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Member</SheetTitle>
        </SheetHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vip_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="VIP Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={updateMutation.isPending}>Save Change</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditMember;
