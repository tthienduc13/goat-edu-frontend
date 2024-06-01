interface CreateLayoutProps {
  children: React.ReactNode;
}

const CreateLayout = ({ children }: CreateLayoutProps) => {
  return <main className="w-full h-full p-10">{children}</main>;
};

export default CreateLayout;
