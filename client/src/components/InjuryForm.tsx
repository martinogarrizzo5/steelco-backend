import { constants } from "buffer";
import { useState } from "react";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import PageTitle from "../components/PageTitle";
import axios, { AxiosError } from "axios";
import Input from "./Input";
import Placeholder from "react-select/dist/declarations/src/components/Placeholder";
import Select from "react-select";
import { string } from "zod";
import { Factory } from "@prisma/client";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DatePicker from "./DatePicker";

export interface InjuryFormData {
  factory: Factory;
  date: Date;
  description: string;
}

interface InjuryFormProps {
  onSubmit: (data: InjuryFormData) => void;
  defaultData?: Factory;
  edit?: boolean;
  onDelete?: () => void;
}

function InjuryForm(props: InjuryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<InjuryFormData>();
  const [factories, setFactories] = useState<Factory[]>([]);
  const [error, setError] = useState<string>();

  const fetchFactories = async () => {
    try {
      const response = await axios.get("/api/report");
      setFactories(response.data);
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage = (error.response?.data as any).message;
      setError(errorMessage);
    }
  };

  React.useEffect(() => {
    fetchFactories();
  }, []);

  return (
    <main className="max-w-xl mx-auto mb-4">
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <div className="flex flex-col mb-6">
          <label className="label mb-2">Stabilimento</label>
          <Controller
            name="factory"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={"Seleziona Stabilimento"}
                isSearchable={false}
                options={factories}
                getOptionLabel={(el) => el.name}
                getOptionValue={(el) => el.id.toString()}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="label mb-2">Data</label>
          <DatePicker />
          {/* <Controller
            name="date"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Calendar onChange={onChange} value={value} className="mb-6" />
            )}
          /> */}
        </div>
        <div className="flex flex-col mb-6">
          <label className="label mb-2">Description</label>
          <Input
            name="description"
            type="textarea"
            placeholder="Inserisci Descrizione"
            className="h-40"
            formRegister={register("description")}
          />
        </div>
        <button type="submit" className="btn w-full mt-8">
          {props.edit ? <span>Modifica</span> : <span>Aggiungi</span>}
        </button>
      </form>
    </main>
  );
}

export default InjuryForm;
