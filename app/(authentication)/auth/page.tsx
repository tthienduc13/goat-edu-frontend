import { CheckEmailForm } from "@/components/auth/check-email-form";
import { Options } from "@/components/auth/options";
import { Social } from "@/components/auth/social";

const AuthPage = () => {
  return (
    <main className="text-white my-8 px-6 flex flex-wrap justify-between items-center w-full max-w-[1200px] flex-grow">
      <div className="flex flex-1 flex-col max-w-[440px] w-full">
        <h1 className="mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fc538d]  to-[#ce3df3] text-5xl leading-[56px]  ">
          Where students suffer together
        </h1>
        <h2 className="text-white mb-8  text-[23px] leading-[30px]">
          We know how hard it is to be in your dream univeristy. It doesn&apos;t
          have to be. Personalized news feed, support community and search, much
          better than what&rsquo;s out there. Maybe ;)
        </h2>
        <div className="flex overflow-y-auto z-1 flex-col w-full rounded max-w-full">
          <CheckEmailForm />
          <Options label="Or sign up with" />
        </div>
        <div className="flex pb-8 justify-between">
          <Social />
        </div>
      </div>
    </main>
  );
};
export default AuthPage;
