import { Button } from "@/Components/ui/button";
import InputSelect from "@/Components/ui/custom/input-select";
import { useGuruDataStore } from "@/hooks/useGuruData";
import { useMapelDataStore } from "@/hooks/useMapelData";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const AddGuruMapel = ({ form, data }) => {
  const { guru, mapel } = usePage().props;
  const [generateCount, setGenerateCount] = useState(data?.length || 1);
  useEffect(() => {
    mapel && useMapelDataStore.setState({ mapel: mapel });
  }, [mapel]);

  useEffect(() => {
    if (data) {
      data.map((data, index) => {
        form.setValue(`mapel_id[${index}]`, String(data?.mapel_id));
        form.setValue(`guru_id[${index}]`, String(data?.id));
      });
    }
  }, [data]);

  const handleClick = (action) => {
    if (action === "add") {
      setGenerateCount(generateCount + 1);
    } else {
      setGenerateCount(generateCount - 1);
      form.setValue(`mapel_id[${generateCount - 1}]`, "");
      form.setValue(`guru_id[${generateCount - 1}]`, "");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Button
          variant={"secondary"}
          onClick={(e) => {
            e.preventDefault();
            handleClick("add");
          }}
        >
          Add Pelajaran
        </Button>
      </div>
      {[...Array(generateCount)].map((_, index) => (
        <SelectComponent
          key={index}
          index={index}
          form={form}
        />
      ))}
      <Button
        variant={"destructive"}
        onClick={(e) => {
          e.preventDefault();
          handleClick("remove");
        }}
        disabled={generateCount === 1}
      >
        Hapus Pelajaran
      </Button>
    </div>
  );
};

export const SelectComponent = ({ index, form }) => {
  const { guru, mapel: optMapel } = usePage().props;
  const [optGuru, setOptGuru] = useState(guru);
  const handleMapelChange = (e) => {
    form.setValue(`guru_id[${index}]`, "");
    form.setValue(`mapel_id[${index}]`, e);

    const selectedMapelId = e;
    const selectedMapel = optMapel.find((mapel) => mapel.id == selectedMapelId);

    const filteredGuru = guru.filter((guru) => guru.mapel_id == selectedMapel?.id);
    setOptGuru(filteredGuru);
  };
  const recentOptMapel = form.getValues(`mapel_id[]`);

  return (
    <div className="grid grid-cols-2 space-x-4">
      <InputSelect
        form={form}
        name={`mapel_id[${index}]`}
        label={"Mata Pelajaran"}
        placeholder={"Pilih Mata Pelajaran"}
        onValueChange={handleMapelChange}
        required
        data={optMapel
          .filter(
            (mapel) =>
              !recentOptMapel?.includes(String(mapel.id)) ||
              recentOptMapel === "" ||
              form.getValues(`mapel_id[${index}]`) == mapel.id
          )
          .map((mapel) => ({
            value: mapel.id,
            label: mapel.nama_mata_pelajaran,
          }))}
      />

      <InputSelect
        form={form}
        name={`guru_id[${index}]`}
        label={"Guru"}
        placeholder={"Pilih Guru"}
        disabled={!form.getValues(`mapel_id[${index}]`)}
        data={optGuru.map((guru) => ({
          value: guru.id,
          label: guru.nama_guru,
        }))}
        required
      />
    </div>
  );
};

export default AddGuruMapel;
