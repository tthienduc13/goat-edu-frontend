import { SiteFooterData } from "@/constants/footer-data";

export const SiteFooter = () => {
  return (
    <div className="w-full gap-y-8 flex flex-row justify-between flex-wrap  mb-8">
      {SiteFooterData.map((item, index) => (
        <div key={index} className="flex flex-col gap-y-4 md:w-1/4 w-1/2">
          <h2 className="text-base font-semibold">{item.title}</h2>
          <div className="flex flex-col gap-y-2 text-muted-foreground text-sm">
            {item.content.map((item, index) => (
              <span key={index}>{item.name}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
