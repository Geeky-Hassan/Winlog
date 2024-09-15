import Brags from "../components/Brags";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <>
        <section>
            <Link to={'/brags'}>Add Brags</Link>
        <div className="contain text-xl">
            <h1>Home here</h1>
        </div>
        <Brags />
        </section>
        </>
    )
}

export default Home;