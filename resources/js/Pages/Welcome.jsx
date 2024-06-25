import GuestLayout from "@/Layouts/GuestLayout";
import { Link, Head, useForm as useFormHook } from "@inertiajs/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { Button } from "@/Components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/Components/ui/input";
import { useToast } from "../Components/ui/use-toast";
import { Toaster } from "@/Components/ui/toaster";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Checkbox } from "@/Components/ui/checkbox";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email must be a valid email",
    }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function Welcome({ canResetPassword }) {
  const { toast } = useToast();
  const { post, errors } = useFormHook();
  useEffect(() => {
    if (errors.email || errors.password) {
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
        variant: "destructive",
        title: "Login Failed",
        description: "Please check your email and password.",
      });
    }
  }, [errors, toast]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-undef
    post(route("login", data));
  };

  return (
    <GuestLayout>
      <Head title="Welcome" />
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-4xl h-[500px] flex w-full rounded-xl bg-white shadow dark:bg-gray-800">
          <div className="w-1/3">
            <img
              className="w-full h-full object-cover rounded-l-xl"
              src="https://picsum.photos/400/400"
              alt="Workflow"
            />
          </div>
          <div className="w-2/3 p-8 flex flex-col gap-y-10 h-full">
            <div className="mt-4 text-center">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Masuk Sistem Informasi Sekolah</h1>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
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
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Ingat Saya
                    </label>
                  </div>
                  <Link
                    href={"/forgot-password"}
                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>

        <Toaster />
      </div>
    </GuestLayout>
  );
}
