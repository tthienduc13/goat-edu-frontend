import { Recommend } from "./recommend";
import { Realted } from "./related";

export const SideNav = () => {
  return (
    <div className="flex flex-col w-1/5 gap-y-4">
      <Recommend />
      <Realted />
    </div>
  );
};
