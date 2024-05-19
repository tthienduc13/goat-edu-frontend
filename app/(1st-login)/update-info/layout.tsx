interface UpdateInfoLayoutProps {
  children: React.ReactNode;
}

const UpdateInfoLayout = ({ children }: UpdateInfoLayoutProps) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default UpdateInfoLayout;
