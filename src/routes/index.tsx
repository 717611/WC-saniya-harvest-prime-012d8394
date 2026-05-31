import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Hero } from "@/components/site/Hero";
import { StatsStrip } from "@/components/site/StatsStrip";
import { WhatWeDo } from "@/components/site/WhatWeDo";
import { Products } from "@/components/site/Products";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Testimonials } from "@/components/site/Testimonials";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    document.title = "Saniya Agriculture Solution — Organic Fertilizers, Manure & Seeds";
  }, []);

  return (
    <>
      <Hero />
      <StatsStrip />
      <WhatWeDo />
      <Products />
      <WhyChooseUs />
      <Testimonials />
      <FinalCta />
    </>
  );
}
