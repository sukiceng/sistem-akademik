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
import InputSelect from "@/Components/ui/custom/input-select";

const formSchema = z.object({
  kelas_id: z.string().min(1, { message: "Kelas belum diisi" }),
});

export const PindahHandler = ({ isOpen, onClose, data }) => {
  const { listKelas } = usePage().props.data;
  const { flash } = usePage().props;
  const { kelas_id, siswa_id } = data;
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kelas_id: String(kelas_id),
    },
  });

  const onSubmit = (data) => {
    try {
      // eslint-disable-next-line no-undef
      router.patch(route("kenaikan-kelas.update", { id: siswa_id }), { ...data, siswa_id: siswa_id });
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
      title="Pindah Kelas"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
            <div className="space-y-6">
              <InputSelect
                form={form}
                name={"kelas_id"}
                label={"Kelas"}
                placeholder={"Pilih Kelas"}
                data={listKelas.map((data) => ({
                  value: data.id,
                  label: `${data.nama_kelas} (${data.tahun_ajaran})`,
                }))}
              />
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
