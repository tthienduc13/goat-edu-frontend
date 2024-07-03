import { Logo } from "../custom/logo";
export const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="animate-pulse">
        <Logo size="lg" />
      </div>
    </div>
  );
};
