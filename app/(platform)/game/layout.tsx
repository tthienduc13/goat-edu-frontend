interface MatcherLayoutProps {
  children: React.ReactNode;
}

const MatcherLayout = ({ children }: MatcherLayoutProps) => {
  return (
    <div className="fixed left-0 top-0 z-20 w-screen bg-background h-screen">
      {children}
    </div>
  );
};

export default MatcherLayout;
