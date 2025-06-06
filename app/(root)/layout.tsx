import { ChildProps } from "@/types";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

function Layout({ children }: ChildProps) {
  return (
    <main>
      <Navbar />
      <div className="mx-auto px-4">{children}</div>
      <Footer />
    </main>
  );
}

export default Layout;
