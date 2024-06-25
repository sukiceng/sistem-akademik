import { Modal } from "@/Components/ui/custom/modal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Head, useForm as inertiaForm, router, usePage } from "@inertiajs/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/Components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Form } from "@/Components/ui/form";
import InputForm from "@/Components/ui/custom/input-form";
import { Button } from "@/Components/ui/button";
import { useGuruDataStore } from "@/hooks/useGuruData";
import InputSelect from "@/Components/ui/custom/input-select";
import { Separator } from "@/Components/ui/separator";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddGuruMapel from "@/Components/tables/kelas-tables/Kelas-addGuru";

const formSchema = z.object({
  nama: z
    .string()
    .min(1, { message: "Name Belum diisi." })
    .transform((value) => value?.trim()),
  wali_guru_id: z
    .string()
    .min(1, { message: "Wali Guru Belum diisi." })
    .transform((value) => value?.trim()),
  tahun_mulai: z.string().min(1, { message: "Tahun Mulai Ajaran Belum diisi." }),
  tahun_selesai: z.string().min(1, { message: "Tahun Selesai Ajaran Belum diisi." }),
});

const KelasUpdateModal = ({ kelas, guru, mapel }) => {
  const { setPage } = usePage();
  const { errors, auth } = usePage().props;
  const dataKelas = kelas || {};
  const currentYear = new Date().getFullYear();
  const optTahunAjar = () => {
    const next5Year = currentYear + 5;
    let last5Year = currentYear - 5;
    let years = [];
    while (last5Year <= next5Year) {
      years.push(last5Year++);
    }
    return years;
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: dataKelas?.nama_kelas || "",
      wali_guru_id: String(dataKelas?.guru_id) || "",
      tahun_mulai: String(dataKelas?.tahun_ajaran.split("/")[0]) || "",
      tahun_selesai: String(dataKelas?.tahun_ajaran.split("/")[1]) || "",
      guru_id: "",
      mapel_id: "",
    },
  });

  const onSubmit = () => {
    const data = form.getValues();
    console.log("🚀 ~ onSubmit ~ data:", data);
    // eslint-disable-next-line no-undef
    router.patch(route("Kelas&Mapel.update", { id: dataKelas?.id }), {
      ...data,
      insertFor: "kelas",
      id: dataKelas?.id,
    });
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
        });
      });
    }
  }, [errors, form, setPage]);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Kelas & Mapel" />

      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent type={"detail"} />

        <div className="flex-col items-center justify-between space-y-10 space-x-10 p-4 px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
              <div className="space-y-6">
                <Separator />
                <InputForm
                  form={form}
                  name={"nama"}
                  label={"Nama Kelas"}
                  type={"text"}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputSelect
                    form={form}
                    name={"tahun_mulai"}
                    label={"Tahun Ajaran Mulai"}
                    placeholder={"Pilih Tahun"}
                    data={optTahunAjar()
                      .slice(0, -1)
                      .map((year) => ({
                        value: year,
                        label: year,
                      }))}
                    onValueChange={(e) => {
                      form.setValue("tahun_selesai", (Number(e) + 1).toString());
                      form.setValue("tahun_mulai", e);
                    }}
                  />

                  <InputSelect
                    form={form}
                    name={"tahun_selesai"}
                    label={"Tahun Ajaran Selesai"}
                    placeholder={"Pilih Tahun"}
                    data={optTahunAjar()
                      .slice(1)
                      .map((year) => ({
                        value: year,
                        label: year,
                      }))}
                    onValueChange={(e) => {
                      form.setValue("tahun_selesai", e);
                      form.setValue("tahun_mulai", (Number(e) - 1).toString());
                    }}
                  />
                </div>
                <InputSelect
                  form={form}
                  name={"wali_guru_id"}
                  label={"Guru Wali Kelas"}
                  placeholder={"Pilih Guru Wali"}
                  data={guru.map((data) => ({
                    value: data.id,
                    label: data.nama_guru,
                  }))}
                />
                <h3 className="text-lg font-semibold leading-none tracking-tight">Tambah Mata Pelajaran</h3>
                <Separator />
                <div className="">
                  <AddGuruMapel
                    form={form}
                    data={dataKelas?.guru_mapel || []}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save</Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default KelasUpdateModal;
