import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/axiosConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreateMemberSchema = z.object({
  customer_name: z.string().nonempty({ message: "Member Name is required!" }),
  vip_code: z.string().nonempty({ message: "Vip Code is required!" }),
  phone: z.string().nonempty({ message: "Phone is required!" }),
});
const CreateMember = () => {
  const { data: authData } = useSession();
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationKey: ["create-member"],
    mutationFn: async (member_data) => {
      const { data } = await api.post("/customer", member_data, {
        headers: { Authorization: `Bearer ${authData.user.token}` },
      });
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        //
        toast.dismiss();
        toast.success(`Successfully Created ${data.customer.customer_name}!`);
        console.log("successfully Created!");
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["member-list"] });
      }
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`);
      console.log(error.message);
    },
  });

  const form = useForm({
    resolver: zodResolver(CreateMemberSchema),
    defaultValues: {
      customer_name: "",
      vip_code: "",
      phone: "",
    },
    disabled: addMutation.isPending,
  });

  const onSubmit = (values) => {
    console.log(values);
    toast.loading("Create Processing!");
    addMutation.mutateAsync(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Create Member Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 space-x-5">
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
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
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={addMutation.isPending}>Add Member</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CreateMember;
