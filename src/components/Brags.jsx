import { useState, useEffect } from "react";
import { GetBrags } from "../handles/HandleBrag";
import moment from "moment";
import { Link } from "react-router-dom";
const Brags = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await GetBrags();
            setData(res.brags);
        };

        fetchData();
    }, []);

    // console.log(`/uploads/${test.brag_img}`);
    return (
        <>
              <section className="text-black p-6">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">All Your Brags Here</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.length>0 ? data.map((brag) => (
                    <div key={brag.brag_id} className="p-5 border-2 border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <img src={`http://127.0.0.1:8000/uploads/${brag.brag_img}`} alt={brag.brag_name} className="w-full h-40 object-cover rounded-md mb-4" />
                        <h2 className="text-xl font-semibold">{brag.brag_name}</h2>
                        <p className="text-gray-600">{brag.brag_desc}</p>
                        <p className="text-gray-500 mt-2">
                            <strong>Start Date:</strong> {moment(brag.brag_start_date).format('MMMM Do YYYY')}
                        </p>
                        <p className="text-gray-500">
                            <strong>End Date:</strong> {moment(brag.brag_end_date).format('MMMM Do YYYY')}
                        </p>
                    </div>
                ))
            :
            (
                <>
                <div className="flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">No Brags Yet</h2>
        <p className="text-gray-600 mb-6">Be the first to share your brag here!</p>
        <Link to={"/brags"} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
            Share Your Brag
        </Link>
    </div>
</div>
                </>
            )
            }
            </div>
        </section>
        </>
    );
};
export default Brags;