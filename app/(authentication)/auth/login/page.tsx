import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <main className="w-full ">
      <div className="px-10 py-8 w-full flex justify-start">
        {/* <Logo size="sm"></Logo> */}
      </div>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
