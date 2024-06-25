import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/Components/ui/card";
import InputForm from "@/Components/ui/custom/input-form";
import { Form } from "@/Components/ui/form";
import { toast } from "@/Components/ui/use-toast";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as inertiaForm, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AdminForm = ({ data }) => {
  const formSchema = z
    .object({
      nama: z.string().min(1, { message: "Username is required" }),
      email: z.string({ message: "Email is required" }).email({ message: "Email must be a valid email" }),
      ...(!data && {
        password: z
          .string()
          .min(1, { message: "Password is required" })
          .min(8, "Password must be at least 8 characters"),
        confirm: z
          .string()
          .min(1, { message: "Confirm password is required" })
          .min(8, "Password must be at least 8 characters"),
      }),
    })
    .refine(
      (data) => {
        if (!data.password || !data.confirm) return true;
        return data.password === data.confirm;
      },
      {
        message: "Passwords don't match",
        path: ["confirm"],
      }
    );
  console.log("🚀 ~ AdminForm ~ data:", data);
  const { user } = data ?? {};

  const { post, errors, recentlySuccessful } = inertiaForm();
  const hasErrors = Boolean(Object.keys(errors).length);
  const [updatePassword, setUpdatePassword] = useState(!user);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      nama: user?.username || "",
      password: "",
      confirm: "",
    },
  });

  useEffect(() => {
    if (hasErrors) {
      const messageError = Object.entries(errors).reduce((acc, [key, value]) => {
        form.setError(key, { message: value });
        return { ...acc, [key]: value };
      }, {});
      const toastMessage = Object.values(messageError).map((message) => <li key={message}>{message}</li>);
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
        variant: "destructive",
        title: "Login Failed",
        description: <ol>{toastMessage}</ol>,
        duration: 5000, //5s
      });
    }
    if (recentlySuccessful) {
      // form.reset();
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
        variant: "success",
        title: "Success",
        description: "Data has been saved",
        duration: 5000, //5s
      });
    }
  }, [hasErrors, errors, recentlySuccessful, form]);

  const onSubmit = (data) => {
    try {
      if (user) {
        // eslint-disable-next-line no-undef
        router.patch(route("user.update", { user: user.id }), { ...data, role_id: 3 });
      } else {
        // eslint-disable-next-line no-undef
        post(route("user.store", { ...data, role_id: 3 }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onErrorSubmit = (errors) => {
    if (errors) {
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
        variant: "destructive",
        title: "Save Failed",
        description: "Please make sure you filled all data correctly.",
        duration: 5000, //5s
      });
    }
  };
  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}
          className="space-y-4"
        >
          <CardContent className="space-y-6">
            <div className="space-y-2 mt-10">
              <CardTitle>Admin</CardTitle>
              <CardDescription>{`Make changes to your Admin here. Click save when you're done.`}</CardDescription>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputForm
                form={form}
                name={"email"}
                label={"Email"}
                type={"text"}
              />

              <InputForm
                form={form}
                name={"nama"}
                label={"Username"}
                type={"text"}
              />
              {updatePassword && (
                <>
                  <InputForm
                    form={form}
                    name={"password"}
                    label={"Password"}
                    type={"password"}
                  />
                  <InputForm
                    form={form}
                    name={"confirm"}
                    label={"Confirm Password"}
                    type={"password"}
                  />
                </>
              )}
              {user && (
                <Button
                  variant={updatePassword ? "outline" : "destructive"}
                  className="w-fit"
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdatePassword(!updatePassword);
                  }}
                >
                  {updatePassword ? "Cancel" : "Update Password"}
                </Button>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
const AccountForm = ({ form, user }) => {
  console.log("🚀 ~ AccountForm ~ user:", !user);
  return (
    <>
      <div className="space-y-2">
        <CardTitle>Informasi Akun</CardTitle>
        <CardDescription>{`Make changes to your Account here. Click save when you're done.`}</CardDescription>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 small:grid-cols-1">
        <InputForm
          form={form}
          name={"email"}
          label={"Email"}
          type={"text"}
        />
      </div>
    </>
  );
};
export default AdminForm;
