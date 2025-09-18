import Logo from "../components/layout/Logo";
import RegisterForm from "../components/login/RegisterForm";

export default async function RegisterPage() {
  return (
    <div className="flex flex-col mt-19 space-y-8 justify-center items-center  ml-124 mr-124 mb-19">
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      <div className="flex justify-center w-full items-center">
        <RegisterForm type="register" />
      </div>
    </div>
  );
}
