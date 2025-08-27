import { Footer } from '@/components/layout';
import { FloatingActionButtons } from '@/components/shared';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
      <Footer />
      <FloatingActionButtons />
      {/* <DarkModeDebug /> */}
    </>
  );
}
