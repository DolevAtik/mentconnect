import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedMentors } from "@/components/FeaturedMentors";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedMentors />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
