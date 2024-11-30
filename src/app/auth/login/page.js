"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const LogInFormSchema = z.object({
  username: z.string().nonempty({ message: "username is required!" }),
  password: z.string().nonempty({ message: "password is required!" }),
});
const LogInPage = () => {
  const form = useForm({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);

    signIn("credentials", { ...values, callbackUrl: "/" });
  };
  return (
    <div className=" mx-auto h-screen grid place-items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">Log In</Button>
        </form>
      </Form>
    </div>
  );
};

export default LogInPage;
