import Header from "@/Components/layout/header";
import Sidebar from "@/Components/layout/sidebar";
import { Toaster } from "@/Components/ui/toaster";
import { toast } from "@/Components/ui/use-toast";
import { useErrorDataStore } from "@/hooks/useErrorData";
import { useUserStore } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Authenticated({ user, children }) {
  useEffect(() => {
    useUserStore.setState({ user });
  }, [user]);

  const { setPage } = usePage();
  const { flash } = usePage().props;
  useEffect(() => {
    if (flash?.success || flash?.error) {
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
        variant: flash.success ? "success" : "destructive",
        title: flash.success ? "Success" : "Failed",
        description: flash.success ? flash.success : flash.error,
        duration: 3000, //3s
        onClose: () => setPage((prev) => ({ ...prev, flash: null })),
      });
    }
    delete flash.success;
    delete flash.error;
  }, [flash, setPage]);
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/logo/logo.svg"
        />
      </Head>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 pt-16">{children}</main>
      </div>
      <Toaster />
    </>
  );
}
