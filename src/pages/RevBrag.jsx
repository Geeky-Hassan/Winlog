import RevertBrag from "../components/RevBrag";
import Sidebar from "../components/global/Sidebar";
import Footer from "../components/global/Footer";

const RBrag = () => {
  return (
    <>
      <Sidebar />

      <section className="flex min-h-screen justify-center items-center">
        <RevertBrag />
      </section>
      <Footer />
    </>
  );
};

export default RBrag;
