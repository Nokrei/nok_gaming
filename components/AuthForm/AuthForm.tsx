import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import AuthContext from "@/context/AuthContext";

type AuthForm = {
  action: (email: string, password: string, fullName: string) => void;
  buttonText: string;
  isForRegistration: boolean;
};

type Inputs = {
  fullName: string;
  email: string;
  password: string;
};

export default function AuthForm({
  action,
  buttonText,
  isForRegistration,
}: AuthForm) {
  // To have all account creation / login erros display in the same place
  // importing errors from firebase here.
  const { firebaseError } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    action(data.email, data.password, data.fullName);

  return (
    <div className=" mt-10 w-96 m-auto shadow rounded p-4">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {isForRegistration && (
          <>
            <label className="mb-1" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              className="border p-2 mb-3 rounded"
              type="text"
              autoComplete="name"
              {...register("fullName", { required: true })}
            />
          </>
        )}
        <label className="mb-1 " htmlFor="email">
          Email{" "}
        </label>
        <input
          id="email"
          className="border p-2 mb-3 rounded"
          type="email"
          autoComplete="email"
          {...register("email", { required: true })}
        />

        <label className="mb-1 " htmlFor="password">
          Password{" "}
        </label>
        <input
          id="password"
          className="border p-2 rounded"
          type="password"
          {...register("password", { required: true })}
        />

        {errors.email && (
          <span className=" text-xs text-red-400">
            Please enter valid email.
          </span>
        )}
        {errors.password && (
          <span className="text-xs text-red-400">Please enter password.</span>
        )}
        {firebaseError && (
          <span className="text-xs text-red-400">{firebaseError}</span>
        )}

        <button
          className="bg-sky-600 mt-8 rounded p-2 text-white  font-semibold font-sans hover:bg-sky-700 duration-100"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
