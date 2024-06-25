import { Modal } from "@/Components/ui/custom/modal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useForm as inertiaForm, router, usePage } from "@inertiajs/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/Components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Form } from "@/Components/ui/form";
import InputForm from "@/Components/ui/custom/input-form";
import { Button } from "@/Components/ui/button";

const formSchema = z.object({
  nama: z.string().min(1, { message: "Name is required" }),
});

export const MapelAddModal = ({ isOpen, onClose, data }) => {
  const { errors, flash } = usePage().props;
  const { setPage } = usePage();
  const [isMounted, setIsMounted] = useState(false);

  const { nama_mata_pelajaran, id } = data || {};

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: nama_mata_pelajaran || "",
    },
  });

  const onSubmit = (data) => {
    const payLoad = { ...data, insertFor: "mapel" };
    try {
      if (nama_mata_pelajaran) {
        // eslint-disable-next-line no-undef
        router.patch(route("Kelas&Mapel.update", { id: id }), { ...payLoad, id: id });
      } else {
        // eslint-disable-next-line no-undef
        router.post(route("Kelas&Mapel.new"), payLoad);
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
    if (errors) {
      Object.keys(errors).forEach((key) => {
        form.setError(key, { message: errors[key] });
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
          variant: "destructive",
          title: "Save Failed",
          description: errors[key],
          duration: 5000, //5s
          onClose: () => setPage((prev) => ({ ...prev, errors: null })),
        });
      });
    }
  }, [errors, form, setPage]);

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
      title="Add New Mata Pelajaran"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
            <div className="space-y-6">
              <InputForm
                form={form}
                name={"nama"}
                label={"Nama Mata Pelajaran"}
                type={"text"}
              />
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
