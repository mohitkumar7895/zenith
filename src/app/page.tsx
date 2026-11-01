import HeroSection from '@/components/HeroSection';
import PricingSection from '@/components/PricingSection';
import ServicesSection from '@/components/ServicesSection';
import TechStackSection from '@/components/TechStackSection';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import HomeFaqSection from '@/components/HomeFaqSection';
import BrandsSection from '@/components/BrandsSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PricingSection />
      <ServicesSection />
      <TechStackSection />
      <ProcessSection />
      <TestimonialsSection />
      <HomeFaqSection />
      <BrandsSection />
    </div>
  );
}
