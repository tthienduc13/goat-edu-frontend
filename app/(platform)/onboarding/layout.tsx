interface OnboardingLayout {
  children: React.ReactNode;
}

const OnboardingLayout = ({ children }: OnboardingLayout) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center ">
      {children}
    </div>
  );
};

export default OnboardingLayout;
