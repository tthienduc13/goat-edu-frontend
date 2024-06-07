import { Recommend } from "./recommend";
import { Realted } from "./related";

export const SideNav = () => {
  return (
    <div className="flex flex-col max-w-[300px] gap-y-4">
      <Recommend />
      <Realted />
    </div>
  );
};
