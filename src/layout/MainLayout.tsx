import NavBar from "@/components/NavBar.tsx";
import {Outlet} from "react-router-dom";
import Footer from "@/components/Footer.tsx";

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen m-2 md:m-0'>
      {/* Navbar */}
      <header>
        <NavBar />
      </header>

      {/* Main content */}
      <div className='flex-1'>
        <Outlet />
      </div>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;