import { useState, useEffect } from "react";
import { GetBrags } from "../handles/HandleBrag";

const Brags = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await GetBrags();
            setData(res.brags);
        };

        fetchData();
    }, []);

    console.log(`data finally: ${JSON.stringify(data)}`);
    return (
        <>
            <section className="text-black">
                <div className="text">
                    <h1 className="h1">All your brags here</h1>
                </div>
                <div className="grid grid-cols-4 text-black">
                    {data.map((brag) => (
                        <div key={brag.brag_id} className="p-5 border-2 border-gray-200">
                            <h2>{brag.brag_name}</h2>
                            <h2>{brag.brag_desc}</h2>
                            {/* <p>{brag.content}</p>
                            <p>{brag.date_created}</p> */}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};
export default Brags;