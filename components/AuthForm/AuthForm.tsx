import { useForm } from "react-hook-form";
import { CreateAccount } from "../../utils/AuthGoogle";

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => CreateAccount(data.email, data.password);
  return (
    <div className=" w-96  m-auto">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-1 " htmlFor="email">
          Email{" "}
        </label>
        <input
          id="email"
          className="border p-2 mb-3"
          type="email"
          {...register("email", { required: true })}
        />

        <label className="mb-1 " htmlFor="password">
          Password{" "}
        </label>
        <input
          id="password"
          className="border p-2"
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

        <button
          className="bg-teal-100 p-2  font-semibold font-sans hover:bg-teal-300 duration-200"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
