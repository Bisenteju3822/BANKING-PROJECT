import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
