interface OptionsProps {
  label: string;
}

export const Options = ({ label }: OptionsProps) => {
  return (
    <div className="flex justify-center items-center py-5 text-muted-foreground">
      <div className="flex-1 h-px bg-muted-foreground"></div>
      <span className="px-3 text-[15px] leading-[20px]">{label}</span>
      <div className="flex-1 h-px bg-muted-foreground"></div>
    </div>
  );
};
