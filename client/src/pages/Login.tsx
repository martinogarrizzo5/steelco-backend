import React, { useState } from "react";
import logoImg from "../assets/logo.png";
import { MdOutlineLogin } from "react-icons/md";
import { useAuth } from "../store/authStore";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import Input from "../components/Input";

interface LoginFormData {
  username: string;
  password: string;
}

function LoginScreen() {
  const auth = useAuth();
  const [isPasswordShown, setPasswordShown] = useState(false);

  const { register, handleSubmit, formState } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    await auth.login(data.username, data.password, true);
  };

  return (
    <main className="flex flex-col justify-center h-[100vh]">
      <div className="p-4 px-6 w-full max-w-xl mx-auto">
        <img
          src={logoImg}
          alt="logo"
          className="block h-12 object-contain mx-auto mb-10"
        />
        <h1 className="mb-4 title">Gestione Infortuni</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-6">
            <label className="label" htmlFor="username">
              Username
            </label>
            <Input
              type="text"
              name="username"
              placeholder="Inserisci username"
              formRegister={register("username")}
              trailing={<AiOutlineUser className="text-2xl fill-primary" />}
            />
          </div>
          <div className="flex flex-col mb-6 ">
            <label className="label" htmlFor="password">
              Password
            </label>
            <Input
              name="password"
              type={isPasswordShown ? "text" : "password"}
              trailing={
                isPasswordShown ? (
                  <AiOutlineEye className="text-2xl fill-primary" />
                ) : (
                  <AiOutlineEyeInvisible className="text-2xl fill-primary" />
                )
              }
              placeholder="Inserisci password"
              onClick={() => setPasswordShown(prevVal => !prevVal)}
              formRegister={register("password")}
            />
          </div>
          <button type="submit" className="btn w-full">
            {formState.isSubmitting ? (
              <ClipLoader size={24} color="white" />
            ) : (
              <>
                <MdOutlineLogin className="text-2xl mr-3" />
                <span>Accedi</span>
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginScreen;
