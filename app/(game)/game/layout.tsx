interface MatcherLayoutProps {
  children: React.ReactNode;
}

const MatcherLayout = ({ children }: MatcherLayoutProps) => {
  return (
    <div className="z-20 w-screen bg-background min-h-screen ">{children}</div>
  );
};

export default MatcherLayout;
