"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/Models/schema/loginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import auth from "@/firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useMetaMask } from "../hooks/useMetamask";

export default function LoginForm() {
  const labelStyle = "text-black text-xl font-medium";
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
  const inputStyle = "bg-blue-100/60 p-5 text-black rounded-2xl";
  const [errormsg, setErrormsg] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    signInWithEmailAndPassword(auth.authState, values.email, values.password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
        router.push("/student/dashboard");
      })
      .catch((error) => {
        setErrormsg("Invalid Username or password");
      });
  }

  // useEffect(() => {
  //   if(wallet.accounts[0] == process.env.NEXT_PUBLIC_ADMIN_WALLET_ID?.toLowerCase()) {
  //     router.push("/")
  //   }
  //   auth.getUser();
  //   if (auth.authState.currentUser) {
  //     router.push("/student/dashboard");
  //   }
  // });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className={labelStyle}>Email</FormLabel>
              <FormControl>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Enter the college mail id"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className={labelStyle}>Password</FormLabel>
              <FormControl>
                <input
                  type="password"
                  className={inputStyle}
                  placeholder="Enter the password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          className="bg-blue-600 text-lg font-semibold py-4 px-10 mt-7 rounded-full hover:bg-black"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-red-500 text-md w-full text-center">{errormsg}</p>
    </Form>
  );
}
