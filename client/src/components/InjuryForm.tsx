import { useEffect, useState } from "react";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import PageTitle from "../components/PageTitle";
import axios, { AxiosError } from "axios";
import Input from "./Input";
import Placeholder from "react-select/dist/declarations/src/components/Placeholder";
import Select from "react-select";
import { Factory } from "@prisma/client";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DatePicker from "./DatePicker";
import { IoMdCheckmark } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ClipLoader } from "react-spinners";

export interface InjuryFormData {
  factory?: Factory;
  date?: Date;
  description?: string;
}

interface InjuryFormProps {
  onSubmit: (data: InjuryFormData) => void;
  defaultData?: InjuryFormData;
  factoryOptions: Factory[];
  defaultFactoryId?: number;
  edit?: boolean;
  onDelete?: () => void;
}

function InjuryForm(props: InjuryFormProps) {
  const { register, handleSubmit, watch, formState, control, setValue } =
    useForm<InjuryFormData>({
      defaultValues: props.defaultData,
    });
  const [error, setError] = useState<string>();

  useEffect(() => {
    const factoryOptions = props.factoryOptions;

    if (!factoryOptions) return;
    setValue(
      "factory",
      factoryOptions.find((f) => f.id == props.defaultFactoryId)!
    );
  }, [props.defaultFactoryId, props.factoryOptions]);

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
                options={props.factoryOptions}
                getOptionLabel={(el) => el.name}
                getOptionValue={(el) => el.id.toString()}
                value={value}
                onChange={onChange}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    background: "var(--inputColor)",
                    borderColor: "transparent",
                    padding: "0.2rem 0.2rem",
                    ":hover": { borderColor: "transparent" },
                  }),
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="label mb-2">Data</label>
          <Controller
            name="date"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker date={value} onChange={onChange} />
            )}
          />
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
        <div className="flex items-center w-full gap-8">
          {props.edit && (
            <button
              type="button"
              className="btn flex-1 btn--delete"
              onClick={props.onDelete}
            >
              <RiDeleteBin6Line className="text-2xl mr-3" />
              <span>Elimina</span>
            </button>
          )}
          <button type="submit" className="btn flex-1">
            {formState.isSubmitting ? (
              <ClipLoader size={24} color="white" />
            ) : (
              <>
                <IoMdCheckmark className="text-2xl mr-3" />
                <span>Conferma</span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}

export default InjuryForm;
