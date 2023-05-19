import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Auth() {
  return (
    <div className="flex flex-col min-h-full justify-center items-center py-12 px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/images/logo.png"
          width="50"
          height="50"
          alt="logo"
          className="mx-auto w-auto"
        />
        <h2 className="text-center text-2xl font-bold mt-6 tracking-tight text-slate-800">
          Sign in
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
