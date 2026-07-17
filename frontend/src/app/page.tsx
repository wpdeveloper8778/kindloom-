import HeroSection from '@/components/HeroSection';
import OffersSection from '@/components/OffersSection';
import WelcomeSection from '@/components/WelcomeSection';
import ProductShowcase from '@/components/ProductShowcase';
import TestimonialsSection from '@/components/TestimonialsSection';
import CustomProjectsSection from '@/components/CustomProjectsSection';
import BrandLogos from '@/components/BrandLogos';
import BlogHighlights from '@/components/BlogHighlights';
import NewsletterSection from '@/components/NewsletterSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <OffersSection />
      <WelcomeSection />
      <ProductShowcase />
      <TestimonialsSection />
      <CustomProjectsSection />
      <BrandLogos />
      <BlogHighlights />
      <NewsletterSection />
    </>
  );
}
