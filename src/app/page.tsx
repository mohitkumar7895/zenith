import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TechStackSection from '@/components/TechStackSection';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BrandsSection from '@/components/BrandsSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <BrandsSection />
    </div>
  );
}
