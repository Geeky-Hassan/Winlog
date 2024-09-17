import DeleteBrag from "../components/DelBrag";
import Sidebar from "../components/global/Sidebar";
import Footer from "../components/global/Footer";

const DBrag = () => {
  return (
    <>
      <Sidebar />
      <section className="flex min-h-screen justify-center items-center">
        <DeleteBrag />
      </section>
      <Footer />
    </>
  );
};

export default DBrag;
