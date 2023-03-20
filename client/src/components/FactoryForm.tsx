import React from "react";
import { useForm } from "react-hook-form";
import { IoMdCheckmark } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import Input from "./Input";

export interface FactoryFormData {
  name: string;
  address: string;
}

interface FactoryFormProps {
  defaultValues?: FactoryFormData;
  onSubmit?: (data: FactoryFormData) => Promise<void>;
}

function FactoryForm(props: FactoryFormProps) {
  const { register, handleSubmit, formState } = useForm<FactoryFormData>({
    defaultValues: props.defaultValues,
  });

  const onSubmit = async (data: FactoryFormData) => {
    if (props.onSubmit) {
      await props.onSubmit(data);
    }
  };

  return (
    <form
      className="flex flex-col items-stretch"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col mb-6">
        <label htmlFor="name" className="mb-2">
          Nome
        </label>
        <Input
          type="text"
          name="name"
          placeholder="Inserisci nome"
          formRegister={register("name")}
        />
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="address" className="mb-2">
          Indirizzo
        </label>
        <Input
          type="text"
          name="address"
          placeholder="Inserisci indirizzo"
          formRegister={register("address")}
        />
      </div>
      <button type="submit" className="btn">
        {formState.isSubmitting ? (
          <ClipLoader size={24} color="white" />
        ) : (
          <>
            <IoMdCheckmark className="text-2xl mr-3" />
            <span>Conferma</span>
          </>
        )}
      </button>
    </form>
  );
}

export default FactoryForm;
