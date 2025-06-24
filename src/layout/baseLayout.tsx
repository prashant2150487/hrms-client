import Footer from "@/components/Footer";
import Header from "@/components/header";
import type { ReactNode } from "react";
interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default BaseLayout;
