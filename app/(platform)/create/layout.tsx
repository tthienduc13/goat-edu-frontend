interface CreateLayoutProps {
  children: React.ReactNode;
}

const CreateLayout = ({ children }: CreateLayoutProps) => {
  return <main className="w-full h-full">{children}</main>;
};

export default CreateLayout;
