import Brags from "../components/Brags";
import Footer from "../components/global/Footer";
import Sidebar from "../components/global/Sidebar";
const Home = () => {
  return (
    <>
      <Sidebar />
      <section className="min-h-screen">
        <Brags />
      </section>

      <Footer />
    </>
  );
};

export default Home;
