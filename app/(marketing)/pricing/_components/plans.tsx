import { HoverEffect } from "@/components/ui/card-hover-effect";

export const Plans = () => {
  const projects = [
    {
      title: "Free",
      description: "Recommended for starter user",
      price: "0",
      link: "https://stripe.com",
    },
    {
      title: "Standard",
      description:
        "Some greate functions unlocked, perfect for experienced user",
      price: "4.99",
      link: "https://netflix.com",
    },
    {
      title: "Premium",
      description: "All fucntions available, fit for your needs",
      price: "9.99",
      link: "https://google.com",
    },
    {
      title: "Enterprise",
      description: "All functions available, unlock ChatBot",
      price: "24.99",
      link: "https://meta.com",
    },
  ];
  return (
    <div className="mx-auto">
      <HoverEffect items={projects} />
    </div>
  );
};
