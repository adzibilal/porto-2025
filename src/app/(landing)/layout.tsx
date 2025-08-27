import { Navbar, Footer } from '@/components/layout';
import { FloatingActionButtons, DarkModeDebug } from '@/components/shared';

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
