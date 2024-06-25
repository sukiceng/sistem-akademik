import { Modal } from "@/Components/ui/custom/modal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { router, usePage } from "@inertiajs/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/Components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Form } from "@/Components/ui/form";
import InputForm from "@/Components/ui/custom/input-form";
import { Button } from "@/Components/ui/button";

const formSchema = z.object({
  nilai: z.string().min(1, { message: "Nilai belum diisi" }).regex(/^\d+$/, { message: "Nilai harus angka" }),
});

export const NilaiHandler = ({ isOpen, onClose, data }) => {
  const { nilai: NilaiData } = data;
  const { flash } = usePage().props;
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nilai: NilaiData ? NilaiData : "",
    },
  });

  const onSubmit = (nilai) => {
    const payLoad = { ...data, ...nilai };
    console.log("🚀 ~ onSubmit ~ payLoad:", payLoad);
    try {
      if (NilaiData) {
        // eslint-disable-next-line no-undef
        router.patch(route("nilai.update", { nilai: data.nilai_id }), { ...data, ...nilai });
      } else {
        // eslint-disable-next-line no-undef
        router.post(route("nilai.store", { kelas: data.kelas_id }), payLoad);
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

  useEffect(() => {
    if (flash.success) {
      onClose();
    }
  }, [flash.success, onClose]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Nilai"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
            <div className="space-y-6">
              <InputForm
                form={form}
                name={"nilai"}
                label={"Nilai Mata Pelajaran"}
                type={"number"}
                min={0}
                max={100}
              />
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
