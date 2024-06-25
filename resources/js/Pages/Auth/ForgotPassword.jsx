import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/ui/custom/InputError";
import PrimaryButton from "@/Components/ui/custom/PrimaryButton";
import TextInput from "@/Components/ui/custom/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import Checkbox from "@/Components/ui/custom/Checkbox";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit = (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-undef
    post(route("password.email"));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-xl p-8 flex flex-col w-full rounded-xl bg-white shadow dark:bg-gray-800">
          <h1 className="text-3xl font-bold mb-4">Lupa Password ?</h1>
          <div className="mb-4 text-sm text-gray-600">
            Jangan khawatir! Cukup ketik email Anda dan kami akan mengirimkan Anda link untuk mengatur ulang password
            Anda!.
          </div>

          {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

          <form onSubmit={submit}>
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              isFocused={true}
              onChange={(e) => setData("email", e.target.value)}
            />

            <InputError
              message={errors.email}
              className="mt-2"
            />
            <div className="flex items-center mt-4 space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Saya Setuju dengan <span className="underline text-slate-800">Syarat & Ketentuan </span>
              </label>
            </div>
            <div className="flex items-center justify-end mt-4">
              <Button
                className=" w-full"
                disabled={processing}
              >
                Email Password Reset Link
              </Button>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}
