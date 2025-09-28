import Logo from "../components/layout/Logo";
import RegisterForm from "../components/login/RegisterForm";

export default async function RegisterPage() {
  return (
    <div className="flex flex-col lg:mt-19 space-y-8 justify-center items-center p-6 mx-auto max-w-100 md:max-w-114 lg:max-w-126 ">
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      <div className="flex justify-center w-full items-center">
        <RegisterForm type="register" />
      </div>
    </div>
  );
}
