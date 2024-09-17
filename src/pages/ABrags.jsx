import Sidebar from "../components/global/Sidebar";
import AddBrag from "../components/AddBrag";
import Footer from "../components/global/Footer";

const ABrags = () => {
  return (
    <>
      <Sidebar />
      <section className="">
        <AddBrag />
      </section>
      <Footer />
    </>
  );
};

export default ABrags;
