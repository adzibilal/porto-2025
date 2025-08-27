import {
  HeroSection,
  PortfolioSection,
  TestimonialSection,
} from '@/components/sections';

export default function Home() {
  return (
    <div className="landing-page">
      <HeroSection />
      <PortfolioSection />
      <TestimonialSection />
    </div>
  );
}
