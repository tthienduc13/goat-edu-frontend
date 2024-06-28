import { FeaturesData } from "@/constants/app-feature";
import { FeatureCard } from "./feature-card";

export const AppFeatures = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-xl">Try these updated features</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {FeaturesData.map((data, index) => (
          <FeatureCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
};
