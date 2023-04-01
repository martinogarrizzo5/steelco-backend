import React from "react";
import { useForm } from "react-hook-form";
import { IoMdCheckmark } from "react-icons/io";
import { TfiTrash } from "react-icons/tfi";
import ClipLoader from "react-spinners/ClipLoader";
import { RiDeleteBin6Line } from "react-icons/ri";
import Input from "./Input";
import axios from "axios";
import classNames from "classnames";

export interface FactoryFormData {
  name: string;
  address: string;
}

interface FactoryFormProps {
  defaultValues?: FactoryFormData;
  onSubmit?: (data: FactoryFormData) => Promise<void>;
  editForm?: boolean;
  onDelete?: () => Promise<void>;
}

function FactoryForm(props: FactoryFormProps) {
  const { register, handleSubmit, formState } = useForm<FactoryFormData>({
    defaultValues: props.defaultValues,
  });

  const onSubmit = async (data: FactoryFormData) => {
    if (props.editForm && !formState.isDirty) {
      return;
    }

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

      <div className="flex items-center w-full gap-8">
        {props.editForm && (
          <button
            type="button"
            className="btn flex-1 btn--delete"
            onClick={props.onDelete}
          >
            <RiDeleteBin6Line className="text-2xl mr-3" />
            <span>Elimina</span>
          </button>
        )}
        <button
          type="submit"
          className={classNames(
            "btn flex-1",
            !formState.isDirty && props.editForm && "!btn--disabled"
          )}
        >
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
  );
}

export default FactoryForm;
