import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Saniya Agriculture Solution",
  description:
    "Agricultural Provider — premier provider, marketer and seller of bio organic fertilizers, manures, phosphorus and seeds across India.",
  url: "https://agriculturesolutions.in/",
  keywords: [
    "Bio organic fertilizers",
    "Manures",
    "Seeds",
    "Phosphorus",
    "Organic farming",
    "Agricultural Provider",
  ],
  areaServed: "IN",
};

function Index() {
  return (
    <>
      <Helmet>
        <title>Saniya Agriculture Solution | Premium Bio Organic Fertilizers & Seeds</title>
        <meta
          name="description"
          content="Premier provider, marketer, and seller of high-quality bio organic fertilizers, manures, phosphorus, and seeds for smarter, sustainable farming across India."
        />
        <link rel="canonical" href="https://agriculturesolutions.in/" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
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
