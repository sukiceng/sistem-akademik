import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/Components/ui/card";
import InputForm from "@/Components/ui/custom/input-form";
import InputSelect from "@/Components/ui/custom/input-select";
import { Form } from "@/Components/ui/form";
import { toast } from "@/Components/ui/use-toast";
import { useMapelDataStore } from "@/hooks/useMapelData";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as inertiaForm, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const GuruForm = ({ data }) => {
  const formSchema = z
    .object({
      nama: z.string().min(1, { message: "Name is required" }),
      nip: z.string().min(1, { message: "NIP is required" }).regex(/^\d+$/, { message: "NIP must be a number" }),
      alamat: z.string().optional(),
      tanggal_lahir: z.string().min(1, { message: "Tanggal Lahir is required" }),
      mapel_id: z.string().min(1, { message: "Mata Pelajaran is required" }),
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
  // NOTE is User Exist form change to edit form
  const { user } = data ?? {};
  const { mapel } = useMapelDataStore();
  const { post, errors, recentlySuccessful } = inertiaForm();
  const hasErrors = Boolean(Object.keys(errors).length);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      nama: user?.guru?.nama_guru || "",
      nip: String(user?.guru?.nip) || "",
      alamat: user?.guru?.alamat || "",
      tanggal_lahir: user?.guru?.tanggal_lahir || "",
      mapel_id: user ? String(user?.guru?.mapel_id) : "",
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
      form.reset();
    }
  }, [hasErrors, errors, recentlySuccessful, form]);

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    try {
      if (user) {
        // eslint-disable-next-line no-undef
        router.patch(route("user.update", { user: user.id }), { ...data, role_id: 2 });
      } else {
        // eslint-disable-next-line no-undef
        post(route("user.store", { ...data, role_id: 2 }));
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
              <CardTitle>Guru</CardTitle>
              <CardDescription>{`Make changes to your Guru here. Click save when you're done.`}</CardDescription>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 small:grid-cols-1">
              <InputForm
                form={form}
                name={"nama"}
                label={"Nama"}
                type={"text"}
              />
              <InputForm
                form={form}
                name={"nip"}
                label={"NIP"}
                type={"number"}
                min={0}
              />
              <InputSelect
                form={form}
                name={"mapel_id"}
                label={"Mata Pelajaran"}
                placeholder={"Pilih Mata Pelajaran"}
                data={mapel.map((data) => ({
                  value: data.id,
                  label: data.nama_mata_pelajaran,
                }))}
              />

              <InputForm
                form={form}
                name={"tanggal_lahir"}
                label={"Tanggal Lahir"}
                type={"date"}
                className="w-fit"
              />
            </div>
            <div className="grid grid-cols-1">
              <InputForm
                form={form}
                name={"alamat"}
                label={"Alamat"}
                type={"text"}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <AccountForm
                form={form}
                user={user}
              />
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
  const [updatePassword, setUpdatePassword] = useState(!user);
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
      </div>
      {user && (
        <Button
          variant={updatePassword ? "outline" : "destructive"}
          onClick={(e) => {
            e.preventDefault();
            setUpdatePassword(!updatePassword);
          }}
        >
          {updatePassword ? "Cancel" : "Update Password"}
        </Button>
      )}
    </>
  );
};
export default GuruForm;
