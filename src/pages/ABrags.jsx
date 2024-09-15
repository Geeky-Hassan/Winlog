import AddBrag from "../components/AddBrag"
import { Link } from "react-router-dom";
const ABrags = () => {
    return (
        <>
        <Link to={'/'}>Go to Home</Link>
        <AddBrag />
        </>
    )
}

export default ABrags;